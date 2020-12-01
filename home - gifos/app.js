/**
 * COMUNICACIÓN CON LA API
 */

const urlTrending = "http://api.giphy.com/v1/gifs/trending?api_key=3573pz5lsjTE2QvU9Ii5g3t7Ky3svfUm&limit=10";
let arrayTrendings = [];

function getTrendings(){
    fetch(urlTrending)
    .then(res => res.json() )
    .then(res => {
        // Recorro los objetos del request
        res.data.forEach(element => {   
            let valores = element;

        // Pusheo los objetos al array "arrayTrendings"
        arrayTrendings.push(valores);
    })
    printTrendings()
    })
    .catch((error) => {
        console.log(error)
    })
}

getTrendings()

// Declaro el nombre de las variables para luego crear los nombres de los elementos y llamarlos desde cualquier bloque.

let gifBox;
let title;
let username;

// Variable para ir iterando sobre los id de las boxes
let idNumber = 0;


// Función para cargar los gifs trendings

function printTrendings(){
    for(let i = 0; i <= 2; ++i){

        // Creo los elementos
        gifBox = document.createElement("img")
        title = document.createElement("h2")
        username = document.createElement("h3")

        // Declaro los hijos de la caja de los gifs
        gifBox.appendChild(title)
        gifBox.appendChild(username)

        // Le coloco los id a cada caja y les agrego el titulo y la url del gif
        gifBox.id = `gfnumber${idNumber}`
        title.innerHTML = arrayTrendings[i].title
        username.innerHTML = `Creator: ${arrayTrendings[i].username}`
        gifBox.src = arrayTrendings[i].images.original.url

        // Declaro a las boxes como hijo de container 
        let container = document.getElementById("list-gifs")
        container.appendChild(gifBox)

        // Aumento el valor de idNumber para luego iterar nuevamente sobre los id de las boxes
        idNumber = idNumber + 1;
    }
}

/**
 * PROGRAMA PARA BUSCAR GIFS
 */

// Evento de la tecla ENTER

let input = document.getElementById('buscador')
input.addEventListener("keydown", function enterCode(e){
    counter = 0;
    maxResults = 0;
    let enter = e.which || e.keyCode;

    if(enter == 13){
        input.addEventListener("keyup", getText)
    }
})

// Varible para ir iterando en el offset y así mostrar nuevas imagenes
let counter = 0; 


// Variable para usarla luego en la condición
let iters = 0;

// Guardo los objetos que me da la API en este array
let results;
let maxResults;

// LLamo al input y a través del evento tomo los valores que escribe el usuario y asocio la función GetText
let inputText;

let btnContainer = document.getElementById("btn-container")
let btnMore = document.createElement("button")


// Función para pedir más resultados

btnMore.addEventListener("click", moreResults)

async function moreResults () {
    counter += 11;
    if(containerResults.children.length <= maxResults){
        await runAPI()
        showResults()
    }else{
        console.log("Ya no hay más resultados");
    }
}

// Función para tomar el texto del input y buscarlo en la API

const getText = async value => {
    // Borro los resultados anteriores para subir nuevos
    results = [];

    // Obtengo el valor que coloque por el input
    inputText = value.path[0].value;

    // Creo la linea que separa los resultados con el subtitulo "Trendings"
    let line = document.getElementById("spacebetween");
    line.className = "line-active";

    // Nombre de lo que se busca
    let searchWord = document.getElementById("search-word")
    searchWord.innerHTML = inputText[0].toUpperCase() + inputText.slice(1)

    await runAPI()

    // Pregunto si la variable ITERS es cero, si lo es, ejecuto la función que creará todos los elementos en el HTML, y si es > a 0 solo se ejecutará la función que sobre-escribira los resultados sobre los elementos ya creados.
    if(iters == 0){
        iters += 1;
        btnContainer.appendChild(btnMore)
        btnMore.innerHTML = 'Ver más'
        showResults()
        
    }else(iters != 0);{
        overwritten()
    }
}    



const runAPI = async () => {
    // Busco en la API el valor de inputText
    let respose = await fetch(`http://api.giphy.com/v1/gifs/search?q=${inputText}&api_key=3573pz5lsjTE2QvU9Ii5g3t7Ky3svfUm&limit=12&offset=${counter}`)

    // Paso los objetos a valor Javascript
    let responseJSON = await respose.json();

    maxResults = responseJSON.pagination.total_count;

    //Subo los objetos al array RESULTS
    results = responseJSON.data
}



let id = 1;
let amount = 12;
let containerResults = document.getElementById("container-results") 

// Función para crear los elementos en el HTML y asignarles las URL que obtuve con la API
const showResults = () => {
    for(let i = 0; i <= 11; ++i){
        let box = document.createElement("div")
        let gif = document.createElement("img")
        let title = document.createElement("h3")
        let creator = document.createElement("h4")
        
        containerResults.appendChild(box)
        box.appendChild(gif)
        box.appendChild(title)
        box.appendChild(creator)

        gif.src = results[i].images.preview_webp.url
        title.innerHTML = results[i].title
        creator.innerHTML = results[i].username

        title.className = "title-gif-results"
        creator.className = "gif-creator-results"
        creator.style.display = 'none'
        title.style.display = 'none'
        
        box.id = id;
        id += 1;
        box.className = "touch"

        // Condición para ejecutar la función getValue así el programa detecta cuando el usuario hace click sobre algún gif y lo muestra en grande.
        if(containerResults.childElementCount == amount){
            getValue()

            // Aumento el valor de esta varible para que luego el for de getValue pueda recorrer todos los gif que hay en el containerResults
            amount += 12;
        }
    }
}


// Función para sobrescribir las URL que obtuve luego de la 2da, 3era, 4ta busqueda, etc.
const overwritten = () => {
    for(let i = 0; i <= 11; ++i){
        // Llamo al hijo del contenedor ("box") donde esta el gif, title y creator 
        let container = containerResults.children[i];

        // Ahora voy llamando a los nietos de container para sobrescribir sus atributos 
        let gif = container.children[0]
        let title = container.children[1]
        let creator = container.children[2]

        // Sobrescribo los valores
        gif.setAttribute('src', `${results[i].images.preview_webp.url}`)
        title.innerHTML = results[i].title
        creator.innerHTML = results[i].username
    }  
}


// Función para obtener los valores de un gif para luego mostrarlo en grande.
const getValue = () => {
    for(let i = 1; i <= amount; ++i){
        
        // Itero hasta llegar al id del gif que clickee.
        let element = document.getElementById(`${i}`)

        // Obtengo el valor del gif (title, url, creator).
        element.addEventListener("click", function clicked() {
            
            let contenedor = document.getElementById("home")
            let url = element.children[0].getAttribute("src")
            let title = this.getElementsByTagName("h3")
            let creator = this.getElementsByTagName("h4")


            // Creo los elementos
            let div = document.createElement("div")
            let divFlex = document.createElement("div")
            let divFlex2 = document.createElement("div")
            let btnExit = document.createElement("button")
            let exitImg = document.createElement("img")
            let bigGif = document.createElement("img")
            let titleGif = document.createElement("h3")
            let creatorGif = document.createElement("h4")

            let btnDownloading = document.createElement("button")
            let btnDgImg = document.createElement("img")
            let btnLike = document.createElement("button")
            let likeImg = document.createElement("img")
            
            

            // Declaro los hijos de los elementos
            div.appendChild(divFlex)
            div.appendChild(divFlex2)

            // Boton salir
            divFlex.appendChild(btnExit)
            btnExit.appendChild(exitImg)

            //Gif
            divFlex.appendChild(bigGif)


            // Titulo del gif y creador
            divFlex2.appendChild(titleGif)
            divFlex2.appendChild(creatorGif)

            // Boton like
            divFlex2.appendChild(btnLike)
            btnLike.appendChild(likeImg)

            // Boton descarga
            divFlex2.appendChild(btnDownloading)
            btnDownloading.appendChild(btnDgImg)

            // Le asignó los atributos a los elementos creados 
            divFlex.className = "flex-container"
            divFlex2.className = "flex-container"
            divFlex.id = "flex-1"
            divFlex2.id = "flex-2"
            div.id = "div-container-results"
            bigGif.id = "gif"
            btnExit.id = "btn-exit"
            btnLike.id = "btn-like"
            bigGif.src = url
            exitImg.src = "assets/close.svg"
            btnDownloading.id = "btn-dg"
            btnDgImg.src = "assets/icon-download.svg"
            titleGif.innerHTML = title[0].innerText;
            creatorGif.innerHTML = creator[0].innerText;
            likeImg.src = "assets/icon-fav.svg"


            // Declaro el contenedor donde esta el GIF
            contenedor.appendChild(div)

            // Elimino el div que contiene el gif, el titulo, user, me gusta y descarga
            btnExit.addEventListener("click", function close(){
                div.remove(bigGif)
            })
        })
    }
}











