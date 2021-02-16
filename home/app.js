/**
 * PROGRAMA PARA BUSCAR GIFS
 */

const ApiKey = '3573pz5lsjTE2QvU9Ii5g3t7Ky3svfUm'
const autocompleteURL = 'http://api.giphy.com/v1/gifs/search/tags'
const searchUrl = 'http://api.giphy.com/v1/gifs/search'
const dropdownMenuContainer = document.getElementById("dropdown-menu")
const input = document.getElementById('buscador')
const moreResultsBtnContainer = document.getElementById("moreResultsBtnContainer")
const body = document.getElementById("fondo")
const containerResults = document.getElementById("container-results") 
const contenedorElementsGif = document.getElementById("home")
const btnMore = document.getElementById("moreBtn")
const barBtn = document.getElementById("bar-btn")
const barIcon = document.getElementById("bar-icon")
const searchForm = document.getElementById("searchForm")
const elementsAmount = 11;
const lastInputValue = ''

/*******            Sugerencias debajo del input            *******/


dropdownMenuContainer.style.display = 'none'
const dropdownMenu = async (value) => {
    dropdownMenuContainer.className = 'flex-container suggestions-styles'
    let valor = value.path[0].value
    let res = await fetch(`${autocompleteURL}?q=${valor}&api_key=${ApiKey}&limit=4`)
    let resJS = await res.json()
    dropdownMenuContainer.style.display = 'flex'
    input.className = 'text-on'

    for(let i = 0; i <= 3; ++i){
        dropdownMenuContainer.children[i].children[0].children[1].innerHTML = resJS.data[i].name // Itero sobre los span y escribo los objetos
    }
}

const clearSuggestions = () => {
    const drowdownMenuItems = 3;
    for(let i = 0; i <= drowdownMenuItems; ++i){
        dropdownMenuContainer.children[i].innerHTML = ''
    }
}

/*******            Evento de la tecla ENTER            *******/

const removeItems = () => {
    const containerResultsChild = document.querySelector(".containerResultsChild")
    if(containerResultsChild){
        containerResults.removeChild(containerResultsChild)
        console.log("Borre el contenido")
    } 
}

input.addEventListener("keydown", dropdownMenu) // Muestro las sugerencias de busquedas
input.addEventListener("focusin", e => {
    barIcon.src = 'assets/close.svg'
    barIcon.style.padding = '3px 0 0 0'
})

input.addEventListener("keydown", e => {
    const enter = e.which || e.keyCode  // Tomo el texto que se ingreso
    if(enter == 13 && inputValue != input.value){
        removeItems()
        getText()
    } 
})

input.addEventListener("focusout", () => {
    barIcon.src = 'assets/icon-search.svg'
    barIcon.style.padding = ''
})

searchForm.addEventListener("reset", () => {
    console.log("Borre el contenido")
})


/*******            Notificación de busqueda sin resultados            *******/

const noResultsFound = () => {
    let noResult = document.createElement("img")
    let textElement = document.createElement("p")
    const message = 'Intenta con otra busqueda'
    textElement.innerHTML = message
    textElement.id = "no-results"
    noResult.src = "assets/icon-busqueda-sin-resultado.svg"

    containerResults.insertAdjacentElement('afterend',textElement)
    containerResults.appendChild(noResult)
}

/*******            Acción al tocar el botón VER MÁS            *******/


let counter = 0;
let results;
let maxResults;


const moreResults = async () => {
    counter += 12;
    if(containerResults.children.length <= maxResults){
        await searchGifs()
        showResults()
    }
}

btnMore.addEventListener("click", moreResults)

let inputValue;
let verMasButton = 'OFF'
btnMore.style.display = "none"

const getText = async value => {
    dropdownMenuContainer.className = 'flex-container'
    input.className = ''
    input.className = 'no-text'

    results = [];

    inputValue = input.value

    // Linea de seaparación
    document.getElementById("spacebetween").className = "line-active";

    // Palabra clave de lo que se busca
    document.getElementById("search-word").innerHTML = inputValue[0].toUpperCase() + inputValue.slice(1)

    await searchGifs()
    
    // Pregunto si ya existe el botón VER MÁS
    if(verMasButton === 'OFF'){
        btnMore.style.display = "block"
        verMasButton = 'ON'
        moreResultsBtnContainer.appendChild(btnMore)
        btnMore.innerHTML = 'Ver más'
        btnMore.id = 'moreBtn'
        createContainerResultsChild()
        clearSuggestions()
    }else{
        createContainerResultsChild()
        clearSuggestions()
    }
}

/*******           Buscador de GIFS            *******/

const searchGifs = async () => {
    let res = await fetch(`${searchUrl}?q=${inputValue}&api_key=${ApiKey}&limit=12&offset=${counter}`)
    let resJS = await res.json();

    maxResults = resJS.pagination.total_count // Almaceno la cantidad de gifs máximo por resultado que puedo mostrar como resultados
    results = resJS.data // Almaceno los objetos de los gifs que recibi de la API

    // Si no encuentro resultados muestro mensaje por pantalla
    if(results == 0){
        noResultsFound()
    }
    console.log(results)
    
}

let amount = 12;

/*******           Función para crear los elementos necesarios para mostrar los GIFS            *******/

let favoritesGifsArray = []

const uploadToLocalStorage = () => {
    // localStorage.removeItem("FavoritesGifs")
    localStorage.setItem("FavoritesGifs", JSON.stringify(favoritesGifsArray))
}





const createContainerResultsChild = () => {
    let newContainer = document.createElement("div")
    containerResults.appendChild(newContainer)
    newContainer.className = 'containerResultsChild'
    showResults()
}


const showResults =  () => {
    const containerResultsChild = document.querySelector(".containerResultsChild")
    for(let i = 0; i <= elementsAmount; ++i){
        // Elementos principales
        let box = document.createElement("figure")
        containerResultsChild.appendChild(box)
        let layer = document.createElement("div")
        let gifUrl = document.createElement("img")
        let title = document.createElement("figcaption")
        let creator = document.createElement("figcaption")

        // Division de los contenedores
        let buttonsBox = document.createElement("div")
        let titlesBox = document.createElement("div")

        // Botones al pasar el mouse
        let btnLike = document.createElement("button")
        let btnDownload = document.createElement("button")
        let btnCopy = document.createElement("button")

        // Iconos para los botones
        let btnLikeImg = document.createElement("img")
        let btnDownloadImg = document.createElement("img")
        let btnCopyImg = document.createElement("img")
        
        // Declaro los hijos de...
        box.appendChild(gifUrl)
        box.appendChild(layer)
        layer.appendChild(buttonsBox)
        layer.appendChild(titlesBox)
        layer.style.display = 'none'

        // Declaro los hijos de los botones
        buttonsBox.appendChild(btnLike)
        buttonsBox.appendChild(btnDownload)
        buttonsBox.appendChild(btnCopy)
        btnLike.appendChild(btnLikeImg)
        btnDownload.appendChild(btnDownloadImg)
        btnCopy.appendChild(btnCopyImg)
        titlesBox.appendChild(creator)
        titlesBox.appendChild(title)

        // Atributos de los elementos
        btnDownloadImg.src = 'assets/icon-download.svg'
        btnLikeImg.src = 'assets/icon-fav.svg'
        btnCopyImg.src = 'assets/icon-max-normal.svg'
        btnDownload.className = 'icons-buttons-box'
        gifUrl.className = 'gif-url'
        btnLike.className = 'icons-buttons-box'
        btnCopy.className = 'icons-buttons-box'
        buttonsBox.className = 'buttons-box flex-container'
        titlesBox.className = 'titles-box'
        title.className = "title-gif-results"
        creator.className = "figcaption-creator"
        layer.className = 'layer-hover'
        box.className = "cardGifs"
        
        title.innerHTML = results[i].title
        gifUrl.src = results[i].images.preview_webp.url

        if(results[i].username == ""){
            creator.innerHTML = 'Autor desconocido'
        }else{
            creator.innerHTML = results[i].username
        }

        let btnLikeActive = false;

        btnLike.addEventListener('click', async (element) => {
            saveFavoritesAtLocalStorage(gifUrl.currentSrc, title.outerText, creator.outerText)
            btnLikeImg.style.zIndex = '2'
            element.target.src = 'assets/icon-fav-active.svg'
            btnLikeActive = true;
        })

        btnCopy.addEventListener("copy", () => {
            alert("se ha copiado correcctamente")
        })
    
        if(innerWidth > 768){
            box.addEventListener("mouseover", () => {
                layer.style.display = 'block'
                layer.className = 'layerBackground'
                title.style.color = '#ffffff'
                title.style.opacity = '1'
                title.style.zIndex = '4'
            })

            box.addEventListener("mouseout", () => {
                layer.className = ''
                layer.style.display = 'none'
                console.log(btnLikeActive)
            })   

            btnLike.addEventListener('mouseover', (element) => {
                if(btnLikeActive === false){
                    element.target.src = 'assets/icon-fav-hover.svg'
                }
            })

            btnLike.addEventListener('mouseout', (element) => {
                if(btnLikeActive === false){
                    element.target.src = 'assets/icon-fav.svg'
                }
            })
        }
    }
}

let favoritesGifs = []

const saveFavoritesAtLocalStorage = async (url, name, author) => {
    let favorite = {
        enlace: url,
        nombre: name,
        author: author
    }
    favoritesGifs.push(favorite)
    localStorage.setItem("Favorites", JSON.stringify(favoritesGifs))
}

const getFavoritesFromLocalStorage = () => {
    let items = JSON.parse(localStorage.getItem("Favorites"))
    if(items != null){
        items.forEach(element => {
            favoritesGifs.push(element)
        })
    }
}

// Ejecuto la función enseguida ni bien arranca la aplicación web
getFavoritesFromLocalStorage()



















