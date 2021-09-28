/**
 * PROGRAMA PARA OBTENER LOS GIFS FAVORITOS DEL USUARIO MEDIANTE LOCALSTORAGE
 * 
 * Al momento de hacer click sobre el boton un objeto con los datos del gif se guarda en el localstorage. 
 * Por el contrario, si deseas eliminarlo, realizas la misma acción en la sección de gifs FAVORITOS.
 */

const no_content_container = document.getElementById("no-content")
const favorites_container = document.getElementById("favorites-container")
let favorites_gifs = new Array()
let amount_favorites;
const api_key_ = '3573pz5lsjTE2QvU9Ii5g3t7Ky3svfUm'

const saveFavoritesAtLocalStorage = (id, link, name, author) => {
    // I verify if i saved this gif before
    if(!favorites_gifs.includes(indexed[id])){
        let favorite = {
            id: id,
            link: link,
            name: name,
            author: author
        }
        favorites_gifs.push(favorite)
        localStorage.setItem("Favorites", JSON.stringify(favorites_gifs))
    }else{
        return null
    }
}

const getFavorites = () => {
    let items = JSON.parse(localStorage.getItem("Favorites"))
    if(items != null){
        items.forEach(element => {
            favorites_gifs.push(element)
        })
        if(no_content_container) {
            no_content_container.className = "display-none"
        }
    }else{
        no_content_container.style.display = "display-block"
    }
    amount_favorites = favorites_gifs.length
}

getFavorites()


const removeItem = el => {
    favorites_gifs.splice(favorites_gifs.indexOf(indexed[el]), 1)
    localStorage.setItem('Favorites', JSON.stringify(favorites_gifs))
}

let indexed = favorites_gifs.reduce((acc, el) => ({
    ...acc,
    [el.id]: el
}), {})

const getGIFO = id => {
    fetch(`http://api.giphy.com/v1/gifs/${id}?api_key=${api_key_}`)
        .then(res =>  res.json())
        .then(res => {
            downloadMyGifo(res.data.images.original.mp4)
        })
        .catch(err => {
            console.error(err)
        })
}

const copyElement = value => {
    var aux = document.createElement("input");
    aux.setAttribute("value", value);
    document.body.appendChild(aux);
    aux.select();
    document.execCommand("copy");
    document.body.removeChild(aux);
}

const downloadMyGifo = async url => {
    let a = document.createElement('a');
    let response = await fetch(url);
    let file = await response.blob();
    a.download = Math.floor(Math.round(Math.random() * 1998888)); 
    a.href = window.URL.createObjectURL(file);
    a.dataset.downloadurl = ['application/octet-stream', a.download, a.href].join(':');
    a.click();
}

const renderLikedCards = () => {
    if(favorites_gifs.length >= 1){
        favorites_gifs.forEach(element => {
            let figure = document.createElement("figure")
            let layer = document.createElement("div")
            let gif = document.createElement("img") 
            let title = document.createElement("figcaption") 
            let creator = document.createElement("figcaption")
    
            let btn_trash = document.createElement("button")
            let btn_download = document.createElement("button")
            let btn_max = document.createElement("button")
    
            let icon_trash = document.createElement("img")
            let icon_download = document.createElement("img")
            let icon_max = document.createElement("img")
    
            let buttonsBox = document.createElement("div")
            let titlesBox = document.createElement("div")
    
            favorites_container.appendChild(figure)
            figure.appendChild(gif)
            figure.appendChild(layer)
            layer.appendChild(buttonsBox)
            layer.appendChild(titlesBox)        
            buttonsBox.appendChild(btn_trash)
            buttonsBox.appendChild(btn_download)
            buttonsBox.appendChild(btn_max)
            btn_trash.appendChild(icon_trash)
            btn_download.appendChild(icon_download)
            btn_max.appendChild(icon_max)
            titlesBox.appendChild(creator)
            titlesBox.appendChild(title)
            layer.style.display = 'none'
    
            icon_download.src = '/assets/icon-download.svg'
            icon_trash.src = '/assets/icon-trash-normal.svg'
            icon_max.src = '/assets/icon-max-normal.svg'
            btn_download.className = 'icons-buttons-box'
            gif.className = 'animated-element'
            btn_trash.className = 'icons-buttons-box'
            btn_max.className = 'icons-buttons-box'
            buttonsBox.className = 'buttons-box flex-container'
            titlesBox.className = 'titles-box'
            title.className = "title-gif-results"
            creator.className = "figcaption-creator"
            layer.className = 'layer-hover'
            figure.className = 'cards'
    
            gif.src = element.link
            title.innerHTML = element.name

            let btn_trash_active = false
    
            if(element.author === null){
                creator.innerHTML = 'Autor desconocido'
            }else{
                creator.innerHTML = element.author
            }
    
            btn_trash.addEventListener('click', async () => {     
                removeItem(element.id)
                document.location.reload()
            })
    
            btn_max.addEventListener("copy", () => {
                copyElement(element.data.images.original.mp4)
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
    
            btn_download.addEventListener("click", () => {
                getGIFO(element.id) 
            })
        
            if(innerWidth > 768){
                figure.addEventListener("mouseover", () => {
                    layer.style.display = 'block'
                    layer.className = 'above-effect'
                    title.style.color = '#ffffff'
                    title.style.opacity = '1'
                })
    
                figure.addEventListener("mouseout", () => {
                    layer.className = ''
                    layer.style.display = 'none'
                })   
    
                btn_trash.addEventListener('mouseover', (element) => {
                    if(!btn_trash_active){
                        element.target.src = '/assets/icon-trash-hover.svg'
                    }
                })
    
                btn_trash.addEventListener('mouseout', (element) => {
                    if(!btn_trash_active){
                        element.target.src = '/assets/icon-trash-normal.svg'
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
                    let btn_trash_max = document.createElement("button")
                    let icon_download_max = document.createElement("img")
                    let icon_trash_max = document.createElement("img")
                    
                    column_max.appendChild(gif_max)
                    column_max.appendChild(below_max_container)
                    titles_max_container.appendChild(gif_max_username)
                    titles_max_container.appendChild(gif_max_title)
                    max_child.appendChild(btn_exit)
                    btn_exit.appendChild(icon_delete)
                    below_max_container.appendChild(buttons_content_max)
                    buttons_content_max.id = "buttons-content-max"
                    buttons_content_max.appendChild(btn_trash_max)
                    btn_trash_max.appendChild(icon_trash_max)
                    icon_trash_max.src = "../assets/icon-trash-normal.svg"
                    buttons_content_max.appendChild(btn_download_max)
                    btn_download_max.appendChild(icon_download_max)
                    icon_download_max.src = "../assets/icon-download.svg"
    
                    gif_max.src = element.link
                    btn_exit.id = "btn-exit"
                    max_child.id = "max-gifo-child"
                    gif_max_username.innerHTML = element.author
                    if(element.name){
                        gif_max_title.innerHTML = element.name
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
    
                    btn_trash_max.addEventListener("click", () => {
                        favorites_gifs.splice(favorites_gifs.indexOf(element.id), 1)
                        localStorage.setItem('MyGifos', JSON.stringify(favorites_gifs))
                        document.location.reload();
                    })
    
                    btn_download_max.addEventListener("click", () => {
                        getGIFO(element.id) 
                    })
                })
            }else if(innerWidth <= 480){
                figure.addEventListener("click", () => {
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
                    let btn_trash_max = document.createElement("button")
                    let icon_download_max = document.createElement("img")
                    let icon_trash_max = document.createElement("img")
                    
                    column_max.appendChild(gif_max)
                    column_max.appendChild(below_max_container)
                    titles_max_container.appendChild(gif_max_username)
                    titles_max_container.appendChild(gif_max_title)
                    max_child.appendChild(btn_exit)
                    btn_exit.appendChild(icon_delete)
                    below_max_container.appendChild(buttons_content_max)
                    buttons_content_max.id = "buttons-content-max"
                    buttons_content_max.appendChild(btn_trash_max)
                    btn_trash_max.appendChild(icon_trash_max)
                    icon_trash_max.src = "../assets/icon-trash-normal.svg"
                    buttons_content_max.appendChild(btn_download_max)
                    btn_download_max.appendChild(icon_download_max)
                    icon_download_max.src = "../assets/icon-download.svg"
    
                    gif_max.src = element.link
                    btn_exit.id = "btn-exit"
                    max_child.id = "max-gifo-child"
                    gif_max_username.innerHTML = element.author
                    if(element.name){
                        gif_max_title.innerHTML = element.name
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
    
                    btn_trash_max.addEventListener("click", () => {
                        removeItem(element.id)
                        document.location.reload();
                    })
    
                    btn_download_max.addEventListener("click", () => {
                        getGIFO(element.id) 
                    })
                })
            }
        })
    }else{
        document.querySelector("#favorites-no-content").style.display = "flex"
    }
}

renderLikedCards()

