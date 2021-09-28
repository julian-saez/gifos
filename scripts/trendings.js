// Almaceno los endpoints que usaré más adelante
const apiKey = '3573pz5lsjTE2QvU9Ii5g3t7Ky3svfUm'
const urlTrending = "http://api.giphy.com/v1/gifs/trending?"

// Contenedores del DOM
const trendingsGifsContainer = document.getElementById("list-gifs")
const homeSectionContainer = document.getElementById("home")
const messageContent = document.getElementById("message-content")

// Botones de GIFOS TRENDING
const btnNextG = document.getElementById("btn-next")
const btnBackG = document.getElementById("btn-back")


/*************     PROGRAMA PARA OBTENER LOS GIFS TRENDINGS Y COLOCARLOS EN LA SECCIÓN 'TRENDING GIFOS'     *************/

let arrayTrendings = [];
let offset = 0;
let limitResults;

const getTrendings = () => {
    fetch(`${urlTrending}&api_key=${apiKey}&limit=50&offset=${offset}`)
    .then(res => res.json() ) 
    .then(res => {
        limitResults = res.pagination.total_count
        res.data.forEach(element => {   
            arrayTrendings.push(element);
        })
        if(clicksToGetMoreItems === 12){
            if(innerWidth < 480){
                trendingsRenderMobile()
            }else{
                trendingRender()
            }
            
        }
        
    })
    .catch((err) => {
        console.log(err)
    })
}
getTrendings()

let itemsToRender = 2;

// Función para cargar los gifs trendings
function trendingRender(){
    if(trendingsGifsContainer.childElementCount == 0){
        for(let i = 0; i <= itemsToRender; ++i){
            // Parent elements
            let figureElement = document.createElement("figure")
            let gifElementImg = document.createElement("img")
            let layer = document.createElement('div')
            trendingsGifsContainer.appendChild(figureElement)
            figureElement.appendChild(gifElementImg)
            figureElement.appendChild(layer)

            let title = document.createElement("figcaption")
            let author = document.createElement("figcaption")
            let gif_id = document.createElement("span")
    
            let buttonsBox = document.createElement("div")
            let titlesBox = document.createElement("div")

            let btn_like = document.createElement("button")
            let btn_download = document.createElement("button")
            let btn_max = document.createElement("button")

            let icon_like = document.createElement("img")
            let icon_download = document.createElement("img")
            let icon_max = document.createElement("img")

            // Declaro los hijos de...
            figureElement.appendChild(layer)
            layer.appendChild(buttonsBox)
            layer.appendChild(titlesBox)
            layer.style.display = 'none'
            buttonsBox.appendChild(btn_like)
            buttonsBox.appendChild(btn_download)
            buttonsBox.appendChild(btn_max)
            btn_like.appendChild(icon_like)
            btn_download.appendChild(icon_download)
            btn_max.appendChild(icon_max)
            titlesBox.appendChild(author)
            titlesBox.appendChild(title)
            titlesBox.appendChild(gif_id)

            figureElement.classList = "cards"
            icon_download.src = '/assets/icon-download.svg'
            icon_like.src = '/assets/icon-fav.svg'
            icon_max.src = '/assets/icon-max-normal.svg'
            btn_download.classList = 'icons-buttons-box'
            btn_like.classList = 'icons-buttons-box'
            btn_max.classList = 'icons-buttons-box'
            buttonsBox.classList = 'buttons-box flex-container'
            titlesBox.classList = 'titles-box'
            title.classList = "title-gif-results"
            author.classList = "figcaption-creator"
            gif_id.style.display = "none"

            if(arrayTrendings[i].username == ""){
                author.innerHTML = 'Autor desconocido'
            }else{
                author.innerHTML = `${arrayTrendings[i].username}`
            }

            gifElementImg.classList = "gifs-trendings"
            title.innerHTML = arrayTrendings[i].title
            gifElementImg.src = arrayTrendings[i].images.original.url
            gif_id.innerHTML = arrayTrendings[i].id

    
            btn_like.addEventListener('click', () => {
                if(!favorites_gifs.includes(indexed[gif_id.outerText])){
                    saveFavoritesAtLocalStorage(gif_id.outerText, gifElementImg.src, title.outerText, author.outerText)
                    icon_like.style.zIndex = '2'
                }
            })

            btn_like.addEventListener('mouseover', e => {
                e.target.src = '/assets/corazonsito.svg'
            })

            btn_like.addEventListener('mouseout', e => {
                e.target.src = '/assets/icon-fav.svg'
            })

            btn_download.addEventListener("click", () => {
                downloadGifo(arrayTrendings[i].images.original.mp4)
            })

            btn_download.addEventListener("mouseover", e => {
                e.target.src = "/assets/icon-download-hover.svg"
            })

            btn_download.addEventListener("mouseout", e => {
                e.target.src = "/assets/icon-download.svg"
            })

            btn_max.addEventListener("mouseover", e => {
                e.target.src = "/assets/icon-max-hover.svg"
            })

            btn_max.addEventListener("mouseout", e => {
                e.target.src = "/assets/icon-max-normal.svg"
            })

            
            if(innerWidth > 768){
                figureElement.addEventListener('mouseover', () => {
                    layer.style.display = 'block'
                    layer.classList = 'overhead'
                    title.style.color = '#ffffff'
                    title.style.opacity = '1'
                    title.style.zIndex = '4'
                })

                figureElement.addEventListener("mouseout", () => {
                    layer.className = ''
                    layer.style.display = 'none'
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
    
                    if(favorites_gifs.includes(indexed[gif_id.outerText])){
                        icon_like_max.src = '../assets/corazonsito.svg'
                    }else{
                        icon_like_max.src = "../assets/icon-fav.svg"
                    }
                   
                    buttons_content_max.appendChild(btn_download_max)
                    btn_download_max.appendChild(icon_download_max)
                    icon_download_max.src = "../assets/icon-download.svg"
        
                    gif_max.src = gifElementImg.src
                    btn_exit.id = "btn-exit"
                    max_child.id = "max-gifo-child"
                    gif_max_username.innerHTML = author.outerText
                    if(title.outerText){
                        gif_max_title.innerHTML = title.outerText
                    }else{
                        gif_max_title.innerHTML = "Untitled gifo"
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
                        if(!favorites_gifs.includes(indexed[gif_id.outerText])){
                            saveFavoritesAtLocalStorage(gif_id.outerText, gifElementImg.src, title.outerText, author.outerText)
                            icon_like_max.src = "../assets/corazonsito.svg"
                        }
                    })
        
                    btn_download_max.addEventListener("click", () => {
                        downloadGifo(arrayTrendings[i].images.original.mp4)
                    })
                })
            }
        }
    }
}

let elementsFavoritesLength;
let favoritesGifTrendings = new Array()
const removeFavoriteItem = (element) => {
    let newFavoritesGifs = []
    for(let i = 0; i < elementsFavoritesLength; i++) {
      if(favoritesGifTrendings[i].enlace != element && favoritesGifTrendings[i].author != undefined && favoritesGifTrendings[i].enlace != undefined){
        newFavoritesGifs.push(favoritesGifTrendings[i]);
      }
    }
    favoritesGifs = newFavoritesGifs
    saveFavoritesAtLocalStorage()
}

let y = 0

let trendingsRenderMobile = () => {
    for(y; y <= itemsToRender; ++y){
        let index = y
        let figureElement = document.createElement("figure")
        let gifElementImg = document.createElement("img")
        trendingsGifsContainer.appendChild(figureElement)
        figureElement.appendChild(gifElementImg)
        figureElement.classList = "cardGifs"
        gifElementImg.classList = "gifs-trendings"
        gifElementImg.src = arrayTrendings[y].images.preview_webp.url
        let isLiked = favorites_gifs.includes(indexed[arrayTrendings[y].id])

        gifElementImg.addEventListener("click", e => {
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

            gif_max.src = e.target.src
            btn_exit.id = "btn-exit"
            max_child.id = "max-gifo-child"
            gif_max_username.innerHTML = arrayTrendings[y].username
            if(arrayTrendings[y].title){
                gif_max_title.innerHTML = arrayTrendings[y].title
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
                    saveFavoritesAtLocalStorage(arrayTrendings[index].id, arrayTrendings[index].images.original.url, arrayTrendings[index].title, arrayTrendings[index].username)
                    icon_like_max.src = '../assets/corazonsito.svg'
                    isLiked = true;
                }
            })

            btn_download_max.addEventListener("click", () => {
                downloadGifo(arrayTrendings[y].images.original.mp4)
            })
        })
    }
}

let position = 2;
let btnNextClicks = 0;
let clicksToGetMoreItems = 12;

if(innerWidth < 480){
    btnNextG.addEventListener('click', () => {
        itemsToRender += 3
        trendingsRenderMobile()
        if(btnNextClicks === clicksToGetMoreItems){
            clicksToGetMoreItems += 12;
            offset += 50;
            getTrendings()
        }
    })
}else{
    btnNextG.addEventListener('click', () => {
        btnNextClicks += 1 
        messageContent.children[0].innerText = ''
    
        trendingsGifsContainer.children[0].children[0].setAttribute('src', '')
        trendingsGifsContainer.children[0].children[0].setAttribute('src', arrayTrendings[position + 1].images.preview_webp.url)
        trendingsGifsContainer.children[0].children[1].children[1].children[0].innerHTML = arrayTrendings[position + 1].username
        trendingsGifsContainer.children[0].children[1].children[1].children[1].innerHTML = arrayTrendings[position + 1].title
        trendingsGifsContainer.children[0].children[1].children[1].children[2].innerHTML = arrayTrendings[position + 1].id
    
        trendingsGifsContainer.children[1].children[0].setAttribute('src', '')
        trendingsGifsContainer.children[1].children[0].setAttribute('src', arrayTrendings[position + 2].images.preview_webp.url)
        trendingsGifsContainer.children[1].children[1].children[1].children[0].innerHTML = arrayTrendings[position + 2].username
        trendingsGifsContainer.children[1].children[1].children[1].children[1].innerHTML = arrayTrendings[position + 2].title
        trendingsGifsContainer.children[1].children[1].children[1].children[2].innerHTML = arrayTrendings[position + 2].id
    
        trendingsGifsContainer.children[2].children[0].setAttribute('src', '')
        trendingsGifsContainer.children[2].children[0].setAttribute('src', arrayTrendings[position + 3].images.preview_webp.url)
        trendingsGifsContainer.children[2].children[1].children[1].children[0].innerHTML = arrayTrendings[position + 3].username
        trendingsGifsContainer.children[2].children[1].children[1].children[1].innerHTML = arrayTrendings[position + 3].title
        trendingsGifsContainer.children[2].children[1].children[1].children[2].innerHTML = arrayTrendings[position + 3].id

        btnBackG.children[0].setAttribute('src', '/assets/button-slider-left-hover.svg')
    
        position += 3;
        if(btnNextClicks === clicksToGetMoreItems){
            clicksToGetMoreItems += 12;
            offset += 50;
            getTrendings()
        }
    })
}


btnBackG.addEventListener("click", () => {
    if(trendingsGifsContainer.children[0].children[0].src == arrayTrendings[0].images.preview_webp.url){
        messageContent.children[0].innerText = "¡Volviste al inicio!"
    }else{
        if(trendingsGifsContainer.children[0].src == arrayTrendings[3].images.preview_webp.url){
            btnBackG.children[0].setAttribute('src', '/assets/button-slider-left-hover.svg')
        }
        trendingsGifsContainer.children[0].children[0].setAttribute('src', '')
        trendingsGifsContainer.children[0].children[0].setAttribute('src', arrayTrendings[position - 5].images.preview_webp.url)
        trendingsGifsContainer.children[0].children[1].children[1].children[0].innerHTML = arrayTrendings[position - 5].username
        trendingsGifsContainer.children[0].children[1].children[1].children[1].innerHTML = arrayTrendings[position - 5].title
        trendingsGifsContainer.children[0].children[1].children[1].children[2].innerHTML = arrayTrendings[position - 5].id

        trendingsGifsContainer.children[1].children[0].setAttribute('src', '')
        trendingsGifsContainer.children[1].children[0].setAttribute('src', arrayTrendings[position - 4].images.preview_webp.url)
        trendingsGifsContainer.children[1].children[1].children[1].children[0].innerHTML = arrayTrendings[position - 4].username
        trendingsGifsContainer.children[1].children[1].children[1].children[1].innerHTML = arrayTrendings[position - 4].title
        trendingsGifsContainer.children[1].children[1].children[1].children[2].innerHTML = arrayTrendings[position - 4].id

        trendingsGifsContainer.children[2].children[0].setAttribute('src', '')
        trendingsGifsContainer.children[2].children[0].setAttribute('src', arrayTrendings[position - 3].images.preview_webp.url)
        trendingsGifsContainer.children[2].children[1].children[1].children[0].innerHTML = arrayTrendings[position - 3].username
        trendingsGifsContainer.children[2].children[1].children[1].children[1].innerHTML = arrayTrendings[position - 3].title
        trendingsGifsContainer.children[2].children[1].children[1].children[2].innerHTML = arrayTrendings[position - 3].id
        position = position - 3;
    }
})

let likes_saved = new Array()

const gifSaved = (id, link, name, author) => {
    // I verify if i saved this gif before
    likes_saved = JSON.parse(localStorage.getItem("Favorites"))

    let index = likes_saved.reduce((acc, el) => ({
        ...acc,
        [el.id]: el
    }), {})

    if(!likes_saved.includes(index[id])){
        let json = {
            id: id,
            link: link,
            name: name,
            author: author
        }
        likes_saved.push(json)
        localStorage.setItem("Favorites", JSON.stringify(likes_saved))
    }else{
        return null
    }
}




