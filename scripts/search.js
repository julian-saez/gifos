/**
 * BUSCADOR DE GIFS
 */

const api_key = '3573pz5lsjTE2QvU9Ii5g3t7Ky3svfUm'
const autocomplete_url = 'http://api.giphy.com/v1/gifs/search/tags'
const search_url = 'http://api.giphy.com/v1/gifs/search'
const contenedorElementsGif = document.getElementById("home")
const btnMore = document.getElementById("moreBtn")
const barIcon = document.getElementById("bar-icon")
const elementsAmount = 11;
const lastInputValue = ''
const autocompleteList = document.getElementById("autocomplete-list")
autocompleteList.classList = "inactive-items"
const itemsDropmenu = document.querySelectorAll("#autocomplete-list span")
const dropmenu = document.querySelectorAll("#autocomplete-list div")
const moreBtnContainer = document.getElementById("moreResultsBtnContainer")
const categories = document.querySelector("#categories").children[0]


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

const downloadGifo = async url => {
    let a = document.createElement('a');
    let response = await fetch(url);
    let file = await response.blob();
    a.download = Math.floor(Math.round(Math.random() * 1998888)); 
    a.href = window.URL.createObjectURL(file);
    a.dataset.downloadurl = ['application/octet-stream', a.download, a.href].join(':');
    a.click();
}

const showResults = () => {
    countElementToRender = getCountElements(results.length)
    const containerResultsChild = document.querySelector(".container-results-child")
    for(let i = 0; i <= countElementToRender; ++i){
        // Parents elements
        let gif_container = document.createElement("figure")
        containerResultsChild.appendChild(gif_container)
        let overhead_element = document.createElement("div")
        let graphic = document.createElement("img")
        let title = document.createElement("figcaption")
        let creator = document.createElement("figcaption")
        let buttons_container = document.createElement("div")
        let titles_container = document.createElement("div")
        let btn_like = document.createElement("button")
        let btn_max = document.createElement("button")
        let icon_like = document.createElement("img")
        let btn_download = document.createElement("button")
        let icon_download = document.createElement("img")
        let icon_max = document.createElement("img")
        

        gif_container.appendChild(graphic)
        gif_container.appendChild(overhead_element)

        overhead_element.appendChild(buttons_container)
        overhead_element.appendChild(titles_container)
        overhead_element.style.display = 'none'
        buttons_container.appendChild(btn_like)
        buttons_container.appendChild(btn_download)
        buttons_container.appendChild(btn_max)
        btn_like.appendChild(icon_like)
        btn_download.appendChild(icon_download)
        btn_max.appendChild(icon_max)
        titles_container.appendChild(creator)
        titles_container.appendChild(title)

        icon_download.src = 'assets/icon-download.svg'
        icon_like.src = 'assets/icon-fav.svg'
        icon_max.src = 'assets/icon-max-normal.svg'
        btn_download.classList = 'icons-buttons-box'
        graphic.classList = 'animated-element'
        btn_like.classList = 'icons-buttons-box'
        btn_max.classList = 'icons-buttons-box'
        buttons_container.classList = 'buttons-box flex-container'
        titles_container.classList = 'titles-box'
        title.classList = "title-gif-results"
        creator.classList = "figcaption-creator"
        gif_container.classList = "cards-gif-searched"
        overhead_element.className = 'overhead'
        
        title.innerHTML = results[i].title
        graphic.src = results[i].images.original.url

        if(results[i].username == ""){
            creator.innerHTML = 'Autor desconocido'
        }else{
            creator.innerHTML = results[i].username
        }

        let isLiked = favorites_gifs.includes(indexed[results[i].id]);

        btn_like.addEventListener('click', element => {
            if(!isLiked){
                saveFavoritesAtLocalStorage(results[i].id, results[i].images.original.url, results[i].title, results[i].username)
                icon_like.style.zIndex = '2'
                element.target.src = 'assets/corazonsito.svg'
                isLiked = true;
            }
        })

        btn_max.addEventListener("mouseover", () => {
            icon_max.src = "../assets/icon-max-hover.svg"
        })

        btn_max.addEventListener("mouseout", () => {
            icon_max.src = "../assets/icon-max-normal.svg"
        })

        btn_download.addEventListener("mouseover", () => {
            icon_download.src = "../assets/icon-download-hover.svg"
        })

        btn_download.addEventListener("mouseout", () => {
            icon_download.src = "../assets/icon-download.svg"
        })

        if(isLiked){
            icon_like.src = '../assets/corazonsito.svg'
        }else{
            icon_like.src = "../assets/icon-fav.svg"
        }
    
        if(innerWidth > 768){
            gif_container.addEventListener("mouseover", () => {
                overhead_element.style.display = 'block'
                title.style.color = '#ffffff'
                title.style.opacity = '1'
                title.style.zIndex = '4'
            })

            gif_container.addEventListener("mouseout", () => {
                overhead_element.style.display = 'none'
            })   

            btn_like.addEventListener('mouseover', (element) => {
                if(isLiked === false){
                    element.target.src = 'assets/icon-fav-js.svg'
                }
            })

            btn_like.addEventListener('mouseout', (element) => {
                if(isLiked === false){
                    element.target.src = 'assets/icon-fav.svg'
                }
            })

            btn_max.addEventListener("click", () => {
                // Parents  
                let max_container = document.querySelector("#max-gifo")
                let max_child = document.createElement("figure")
                let column_max = document.createElement("div")
                let below_max_container = document.createElement("div")
                let titles_max_container = document.createElement("div")
    
                max_container.appendChild(max_child)
                max_child.appendChild(column_max)
                column_max.appendChild(below_max_container)
                below_max_container.appendChild(titles_max_container)
                
                below_max_container.id = "below-max-container"
                column_max.style.display = "flex"
                column_max.id = "column-max"
                
                // Child elements
                let gif_max = document.createElement("img")
                gif_max.id = "gif-max"
                let gif_max_title = document.createElement("figcaption")
                let gif_max_username = document.createElement("figcaption")
                let btn_exit = document.createElement("button")
                let icon_delete = document.createElement("img")
                let buttons_content_max = document.createElement("div")
                let btn_download_max = document.createElement("button")
                let btn_like_max = document.createElement("button")
                let icon_download_max = document.createElement("img")
                let icon_like_max = document.createElement("img")
                
                column_max.appendChild(gif_max)
                column_max.appendChild(below_max_container)
                titles_max_container.appendChild(gif_max_username)
                titles_max_container.appendChild(gif_max_title)
                max_child.appendChild(btn_exit)
                btn_exit.appendChild(icon_delete)
                below_max_container.appendChild(buttons_content_max)
                buttons_content_max.id = "buttons-content-max"
                buttons_content_max.appendChild(btn_like_max)
                btn_like_max.appendChild(icon_like_max)

                if(isLiked){
                    icon_like_max.src = '../assets/corazonsito.svg'
                }else{
                    icon_like_max.src = "../assets/icon-fav.svg"
                }
               
                buttons_content_max.appendChild(btn_download_max)
                btn_download_max.appendChild(icon_download_max)
                icon_download_max.src = "../assets/icon-download.svg"
    
                gif_max.src = results[i].images.original.url
                btn_exit.id = "btn-exit"
                max_child.id = "max-gifo-child"
                gif_max_username.innerHTML = results[i].username
                if(results[i].title){
                    gif_max_title.innerHTML = results[i].title
                }else{
                    gif_max_title.innerHTML = "my untitled gifo"
                }
                
                max_container.style.display = "flex"
                max_child.id = "gifo-max-child"
                max_child.classList = "flex-container"
                icon_delete.src = "../assets/close.svg"
    
                btn_exit.addEventListener("click", () => {
                    max_container.style.display = "none"
                    max_container.removeChild(max_child)
                })
    
                btn_like_max.addEventListener("click", () => {
                    if(!isLiked){
                        saveFavoritesAtLocalStorage(results[i].id, results[i].images.original.url, results[i].title, results[i].username)
                        icon_like.style.zIndex = '2'
                        icon_like_max.src = '../assets/corazonsito.svg'
                        isLiked = true;
                    }
                })
    
                btn_download_max.addEventListener("click", () => {
                    downloadGifo(results[i].images.original.mp4)
                })
            })
        }else if(innerWidth <= 460){
            gif_container.addEventListener("click", () => {
                // Parents  
                let max_container = document.querySelector("#max-gifo")
                let max_child = document.createElement("figure")
                let column_max = document.createElement("div")
                let below_max_container = document.createElement("div")
                let titles_max_container = document.createElement("div")
    
                max_container.appendChild(max_child)
                max_child.appendChild(column_max)
                column_max.appendChild(below_max_container)
                below_max_container.appendChild(titles_max_container)
                
                below_max_container.id = "below-max-container"
                column_max.style.display = "flex"
                column_max.id = "column-max"
                
                // Child elements
                let gif_max = document.createElement("img")
                gif_max.id = "gif-max"
                let gif_max_title = document.createElement("figcaption")
                let gif_max_username = document.createElement("figcaption")
                let btn_exit = document.createElement("button")
                let icon_delete = document.createElement("img")
                let buttons_content_max = document.createElement("div")
                let btn_download_max = document.createElement("button")
                let btn_like_max = document.createElement("button")
                let icon_download_max = document.createElement("img")
                let icon_like_max = document.createElement("img")
                
                column_max.appendChild(gif_max)
                column_max.appendChild(below_max_container)
                titles_max_container.appendChild(gif_max_username)
                titles_max_container.appendChild(gif_max_title)
                max_child.appendChild(btn_exit)
                btn_exit.appendChild(icon_delete)
                below_max_container.appendChild(buttons_content_max)
                buttons_content_max.id = "buttons-content-max"
                buttons_content_max.appendChild(btn_like_max)
                btn_like_max.appendChild(icon_like_max)

                if(isLiked){
                    icon_like_max.src = '../assets/corazonsito.svg'
                }else{
                    icon_like_max.src = "../assets/icon-fav.svg"
                }
               
                buttons_content_max.appendChild(btn_download_max)
                btn_download_max.appendChild(icon_download_max)
                icon_download_max.src = "../assets/icon-download.svg"
    
                gif_max.src = results[i].images.original.url
                btn_exit.id = "btn-exit"
                max_child.id = "max-gifo-child"
                gif_max_username.innerHTML = results[i].username
                if(results[i].title){
                    gif_max_title.innerHTML = results[i].title
                }else{
                    gif_max_title.innerHTML = "my untitled gifo"
                }
                
                max_container.style.display = "flex"
                max_child.id = "gifo-max-child"
                max_child.classList = "flex-container"
                icon_delete.src = "../assets/close.svg"
    
                btn_exit.addEventListener("click", () => {
                    max_container.style.display = "none"
                    max_container.removeChild(max_child)
                })
    
                btn_like_max.addEventListener("click", () => {
                    if(!isLiked){
                        saveFavoritesAtLocalStorage(results[i].id, results[i].images.original.url, results[i].title, results[i].username)
                        icon_like.style.zIndex = '2'
                        icon_like_max.src = '/assets/corazonsito.svg'
                        isLiked = true;
                    }
                })
    
                btn_download_max.addEventListener("click", () => {
                    downloadGifo(results[i].images.original.mp4)
                })
            })
        }
    }
}

const getTrendingSearches = () => {
    fetch(`http://api.giphy.com/v1/gifs/categories?api_key=${api_key}&limit=6`)
        .then(res => res.json())
        .then(json => {
            json.data.forEach(el => {
                let suggestion = document.createElement("button")
                suggestion.classList = "categories"
                categories.appendChild(suggestion)
                suggestion.innerHTML = el.name
                suggestion.addEventListener("click", e => {
                    searchGifs(e.target.outerText)
                })
            })
        })
        .catch(err => {
            console.log(err)
        })
}

getTrendingSearches()



















