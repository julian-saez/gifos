/**
 * BUSCADOR DE GIFS
 */

const api_key = '3573pz5lsjTE2QvU9Ii5g3t7Ky3svfUm'
const autocomplete_url = 'http://api.giphy.com/v1/gifs/search/tags'
const search_url = 'http://api.giphy.com/v1/gifs/search'
const contenedorElementsGif = document.getElementById("home")
const btnMore = document.getElementById("moreBtn")
const barBtn = document.getElementById("bar-btn")
const barIcon = document.getElementById("bar-icon")
const elementsAmount = 11;
const lastInputValue = ''
const autocompleteList = document.getElementById("autocomplete-list")
autocompleteList.classList = "inactive-items"
const itemsDropmenu = document.querySelectorAll("#autocomplete-list span")
const dropmenu = document.querySelectorAll("#autocomplete-list div")
const moreBtnContainer = document.getElementById("moreResultsBtnContainer")

/*******           Buscador de GIFS            *******/

const searchGifs = async value => {
    results = [];
    let res = await fetch(`${search_url}?q=${value}&api_key=${api_key}&limit=12&offset=${counter}`)
    let json = await res.json();

    maxResults = json.pagination.total_count
    results = json.data
    if(value === inputValue){
        counter += 11
    }

    if(json.data.length === 0){
        noResultsMessage()
    }else{
        let div = document.createElement("div")
        div.className = "container-results-child"
        containerResults.appendChild(div)
        showResults()
    }
}

const removeItemsFromResults = () => {
    const containerResultsChild = document.querySelector(".container-results-child")
    if(containerResultsChild){
        containerResults.removeChild(containerResultsChild)
    } 
    btnMore.style.display = 'none'
}

const noResultsMessage = () => {
    if(containerResults.children.length < 1){
        let message_container = document.createElement("div")
        containerResults.appendChild(message_container)
        message_container.className = 'flex-container no-results-container'
        message_container.id = 'no-results-container'
        if(results == 0){
            let noResult = document.createElement("img")
            let textElement = document.createElement("p")
            const message = 'Intenta con otra busqueda'
            textElement.innerHTML = message
            textElement.id = "no-results"
            noResult.src = "assets/icon-busqueda-sin-resultado.svg"
    
            message_container.appendChild(noResult)
            message_container.appendChild(textElement)
        }
    }
}

itemsDropmenu.forEach(element => {
    element.addEventListener("click", () => {
        removeItemsFromResults()
        initializeSearch(element.innerHTML)
        autocompleteList.classList = "inactive-items"
    })
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
let results = new Array()
let maxResults;
const moreResultsBtnContainer = document.getElementById("moreResultsBtnContainer")

btnMore.addEventListener("click", () => {
    searchGifs(inputValue)
})

let inputValue;
let verMasButton = false

const initializeSearch = async (value) => {
    autocompleteList.classList = "inactive-items"

    input.className = ''
    input.className = 'no-text'

    results = [];
    inputValue = value
    document.getElementById("spacebetween").className = "line-active";

    // Palabra clave de lo que se busca
    document.getElementById("search-word").innerHTML = value[0].toUpperCase() + value.slice(1)

    await searchGifs(value)
}

/*******            
 * 
 * LISTA AUTOCOMPLETADO 
 *             
 ********/

const inputContainer = document.getElementById("input-buscador")

const runUpDropmenu = async value => {
    let items = value 
    autocompleteList.classList = "active-items"
    for(let i = 0; i <= 3; ++i){
        if(items[i].name) itemsDropmenu[i].innerHTML = items[i].name
    }
}

 const fetchDropmenu = async e => {
     inputContainer.classList = 'flex-container suggestions-styles'
     input.className = 'text-on'
     let keyword = input.value
     let res = await fetch(`${autocomplete_url}?q=${keyword}&api_key=${api_key}&limit=4`)
     let resJS = await res.json()
     runUpDropmenu(resJS.data)
 }
 

 /*******           Evento de la tecla ENTER              *******/
 
const input = document.getElementById("buscador")

input.addEventListener('keydown', e => {
    if(e.key !== 'Enter') fetchDropmenu()
})

input.addEventListener("focusin", e => {
    barIcon.src = 'assets/close.svg'
    barIcon.style.padding = "18px 25px 0 0"
})

const removeItems = () => {
    var nested = document.querySelector("#no-results-container");
    nested.remove()
}
 
input.addEventListener("keydown", e => {
    if(e.key === 'Enter'){
        input.className = 'no-text'
        removeItemsFromResults()
        initializeSearch(input.value)
        autocompleteList.classList = "inactive-items"
        if(document.querySelector("#no-results-container")) removeItems()
    } 
})
 
input.addEventListener("focusout", () => {
    barIcon.src = 'assets/icon-search.svg'
    barIcon.style.padding = ''
})



/*******           Función para mostrar los GIFS            *******/

const containerResults = document.getElementById("container-results") 

// Función para saber cuanto será la cantidad de iteraciones a la que deberá realizar el programa de showResults según los elementos que obtuvo de la API
let countElementToRender = 0
const getCountElements = valor => {
    if(maxResults < 11){
        btnMore.style.display = "none"
        return maxResults - 1
    }else if(valor == 12){
        btnMore.style.display = "block"
        return 11
    }else if(valor <= 12){
        btnMore.style.display = "none"
        return valor - 1
    }
}

const showResults = () => {
    countElementToRender = getCountElements(results.length)
    const containerResultsChild = document.querySelector(".container-results-child")
    for(let i = 0; i <= countElementToRender; ++i){
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
        btnDownload.classList = 'icons-buttons-box'
        gifUrl.classList = 'gif-url'
        btnLike.classList = 'icons-buttons-box'
        btnCopy.classList = 'icons-buttons-box'
        buttonsBox.classList = 'buttons-box flex-container'
        titlesBox.classList = 'titles-box'
        title.classList = "title-gif-results"
        creator.classList = "figcaption-creator"
        layer.classList = 'layer-hover'
        box.classList = "cardGifs"
        
        title.innerHTML = results[i].title
        gifUrl.src = results[i].images.original.url

        if(results[i].username == ""){
            creator.innerHTML = 'Autor desconocido'
        }else{
            creator.innerHTML = results[i].username
        }

        let btnLikeActive = false;

        btnLike.addEventListener('click', async (element) => {
            saveFavoritesAtLocalStorage(gifUrl.currentSrc, title.outerText, creator.outerText)
            btnLikeImg.style.zIndex = '2'
            element.target.src = 'assets/corazonsito.svg'
            btnLikeActive = true;
        })

        btnCopy.addEventListener("copy", () => {
            alert("Se ha copiado correctamente")
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
            })   

            btnLike.addEventListener('mouseover', (element) => {
                if(btnLikeActive === false){
                    element.target.src = 'assets/icon-fav-js.svg'
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

/**
 * Sección para guardar las propiedades y valores de los gifs que el usuario guarda
 */

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

// Obtengo los gifs ya guardado para guardarlos en el array de favoritesGifs, asignarles un indice y luego subir todo junto. 
const getFavoritesFromLocalStorage = () => {
    let items = JSON.parse(localStorage.getItem("Favorites"))
    if(items != null){
        items.forEach(element => {
            favoritesGifs.push(element)
        })
    }
}

getFavoritesFromLocalStorage()



















