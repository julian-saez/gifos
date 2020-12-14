/**
 * COMUNICACIÓN CON LA API
 */

const urlTrending = "http://api.giphy.com/v1/gifs/trending?api_key=3573pz5lsjTE2QvU9Ii5g3t7Ky3svfUm&limit=6";
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

// Función para cargar los gifs trendings
let container = document.getElementById("list-gifs")

const resize = () => {
    if(innerWidth > 768) {
        btnVisibility()
    }else{
        btnMobileNext()
    }
}
let idTrend = 0;
function printTrendings(){
    for(let i = 0; i <= 2; ++i){
        // Creo los elementos
        let gifBox = document.createElement("img")
        let title = document.createElement("h2")
        let username = document.createElement("h3")

        // Declaro los hijos de la caja de los gifs
        gifBox.appendChild(title)
        gifBox.appendChild(username)

        // Le coloco los idTren a cada caja y les agrego el titulo y la url del gif
        gifBox.idTrend = `trend${idTrend}`
        title.innerHTML = arrayTrendings[idTrend].title
        username.innerHTML = `Creator: ${arrayTrendings[idTrend].username}`
        gifBox.src = arrayTrendings[idTrend].images.original.url

        // Declaro a las boxes como hijo de container 

        container.appendChild(gifBox)

        // Aumento el valor de idTrend para luego iterar nuevamente sobre los idTrend de las boxes
        idTrend = idTrend + 1;
    }
    if(idTrend >= 3){
        resize()
    }
}


// Función para mostrar los botones de back y next en DESKTOP
const btnVisibility = () => {
    let btnBack = document.createElement("button")
    let btnBackIMG = document.createElement("img")
    btnBackIMG.src = 'assets/button-slider-left.svg'
    btnBack.id = 'btn-back-trendings'

    let btnNext = document.createElement("button")
    let btnNextIMG = document.createElement("img")
    btnNextIMG.src = 'assets/Button-Slider-right.svg'
    btnNext.id = 'btn-more-trendings'


    // Posiciono los botones de atras y siguiente
    // container.insertBefore(btnBack, container.children[0])
    container.insertAdjacentElement('beforebegin',btnBack)
    container.insertAdjacentElement('afterend',btnNext)

    btnBack.appendChild(btnBackIMG)
    btnNext.appendChild(btnNextIMG)

    btnNext.addEventListener("click", () => {
        printTrendings()
    })
}


// Función para mostrar el boton de next en MOBILE
const btnMobileNext = () => {
    let btnShowMore = document.createElement("button")
    let btnImg = document.createElement("img")
    container.appendChild(btnShowMore)
    btnShowMore.appendChild(btnImg)

    btnImg.src = "assets/Button-Slider-right.svg"
    btnShowMore.id = "btn-more-trendings"
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


let btnContainer = document.getElementById("btn-container")
let btnMore = document.createElement("button")
// btnMore.id = "btn-more-style"

// Función para pedir más resultados

btnMore.addEventListener("click", moreResults)

async function moreResults () {
    counter += 11;
    if(containerResults.children.length <= maxResults){
        await runAPI()
        showResults()
    }else{

        // Muestro el icono de "Intenta con otra busqueda" si es que no se encontraron resultados

        let noResult = document.createElement("img")
        let text = document.createElement("p")

        text.innerHTML = "Intenta con otra busqueda"
        text.id = "no-results"
        noResult.src = "assets/icon-busqueda-sin-resultado.svg"

        
        containerResults.insertAdjacentElement('afterend',text)
        containerResults.appendChild(noResult)
    }
}

// LLamo al input y a través del evento tomo los valores que escribe el usuario y asocio la función GetText
let inputText;
let body = document.getElementById("fondo")

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
        if(body.className == "dark"){
            btnMore.className = "dark-text"
        }else{
            btnMore.className = "light-text"
        }
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

    if(results == 0){
        let noResult = document.createElement("img")
        noResult.src = "assets/icon-busqueda-sin-resultado.svg"
        containerResults.insertAdjacentElement('afterend',noResult)

        // Elimino el boton de ver más ya que no sería necesario
        btnContainer.remove(btnMore)
    }
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

let likes = []
let likesUpload = []

// Objetos para guardar en el Local Storage

class Likes{
    constructor(url, name, author){
        this.url = url;
        this.name = name;
        this.author = author;
    }
}


// Extraigo el contenido del LocalStorage para saber si hay objetos

const getLikes = async () => {
    likes = []
    let likesLocalStorage = await JSON.parse(localStorage.getItem("Favorites"))
    
    // Si no hay nada, la función no hace nada
    if(likesLocalStorage == null){
        console.log("No hago nada")
    }else{
        likes.push(likesLocalStorage)
    }
}

// Ejecuto la función enseguida ni bien arranca la aplicación web
getLikes()

// Guardo los gifs cuando el usuario hace click sobre alguno
function saveGifs(){
    localStorage.setItem("Favorites", JSON.stringify(likesUpload))
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
            btnLike.addEventListener("click", function like(){
                likesUpload.push(new Likes(url , title[0].innerText, creator[0].innerText))
                setTimeout(saveGifs, 750)
                // localStorage.removeItem('Favorites')
            })
        })
    }
}

















