/**
 * PROGRAMA PARA BUSCAR GIFS
 */

// Evento de la tecla ENTER

const input = document.getElementById('buscador')
input.addEventListener("keydown", e => {
    const enter = e.which || e.keyCode
    if(enter == 13) input.addEventListener("keyup", getText)
})

// Varible para ir iterando en el offset y así mostrar nuevas imagenes
let counter = 0; 

// Variable para usarla luego en la condición
let iters = 0;

// Guardo los objetos que me da la API en este array
let results;
let maxResults;


const btnContainer = document.getElementById("btn-container")
let btnMore = document.createElement("button")

// Función para pedir más resultados
btnMore.addEventListener("click", moreResults)

async function moreResults () {
    counter += 12;
    if(containerResults.children.length <= maxResults){
        await runAPI()
        showResults()
    }else{
        // Muestro el icono de "Intenta con otra busqueda" si es que no se encontraron resultados
        let noResult = document.createElement("img")
        let text = document.createElement("p")
        const message = 'Intenta con otra busqueda'
        text.innerHTML = message
        text.id = "no-results"
        noResult.src = "assets/icon-busqueda-sin-resultado.svg"
        containerResults.insertAdjacentElement('afterend',text)
        containerResults.appendChild(noResult)
    }
}

// LLamo al input y a través del evento tomo los valores que escribe el usuario y asocio la función GetText
let inputText;
const body = document.getElementById("fondo")

// Función para tomar el texto del input y buscarlo en la API

const getText = async value => {
    // Borro los resultados anteriores para subir nuevos
    results = [];

    // Obtengo el valor que coloque por el input
    inputText = value.path[0].value;

    // Creo la linea que separa los resultados con el subtitulo "Trendings"
    document.getElementById("spacebetween").className = "line-active";

    // Nombre de lo que se busca
    document.getElementById("search-word").innerHTML = inputText[0].toUpperCase() + inputText.slice(1)

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
    let res = await fetch(`http://api.giphy.com/v1/gifs/search?q=${inputText}&api_key=3573pz5lsjTE2QvU9Ii5g3t7Ky3svfUm&limit=12&offset=${counter}`)

    // Paso los objetos a valor Javascript
    let resJS = await res.json();

    maxResults = resJS.pagination.total_count;

    //Subo los objetos al array RESULTS

    results = resJS.data
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
const containerResults = document.getElementById("container-results") 


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
        // if(containerResults.childElementCount == amount){
        box.addEventListener('click', e => {
            const contenedor = document.getElementById("home")
        
            let contenido = e.target
            let url = e.target.getAttribute('src')
            let creator = box.children[2].innerText
            let title = box.children[1].innerText
        
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
        
            // Declaro el contenedor donde esta el GIF
            contenedor.appendChild(div)
        
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
            titleGif.innerHTML = title
            creatorGif.innerHTML = creator
            likeImg.src = "assets/icon-fav.svg"
        
            // function adaptative(){
            //     if(innerWidth <= 768){
        
            //     }else{
            //         div.addEventListener('click', () => {
            //             let hover = document.createElement("span")
            //             let p = document.createElement("p")
            //             p.innerHTML = "HOLA AMIGUITOS DE IUTUB"
            //             hover.id = 'div-hover'
            //             div.appendChild(p)
            //         })
            //     }
            // }
        
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
    if(likesLocalStorage !== null){
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


















