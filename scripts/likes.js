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

const getFavoritesFromLocalStorage = () => {
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

getFavoritesFromLocalStorage()


const removeItem = el => {
    favorites_gifs.splice(favorites_gifs.indexOf(indexed[el]), 1)
    localStorage.setItem('Favorites', JSON.stringify(favorites_gifs))
}

let indexed = favorites_gifs.reduce((acc, el) => ({
    ...acc,
    [el.id]: el
}), {})

const renderLikedCards = () => {
    favorites_gifs.forEach(element => {
        let figure = document.createElement("figure")
        let layer = document.createElement("div")
        let gif = document.createElement("img") 
        let title = document.createElement("figcaption") 
        let creator = document.createElement("figcaption")

        let btnLike = document.createElement("button")
        let btnDownload = document.createElement("button")
        let btnCopy = document.createElement("button")

        let btnLikeImg = document.createElement("img")
        let btnDownloadImg = document.createElement("img")
        let btnCopyImg = document.createElement("img")

        let buttonsBox = document.createElement("div")
        let titlesBox = document.createElement("div")

        favorites_container.appendChild(figure)
        figure.appendChild(gif)
        figure.appendChild(layer)
        layer.appendChild(buttonsBox)
        layer.appendChild(titlesBox)        
        buttonsBox.appendChild(btnLike)
        buttonsBox.appendChild(btnDownload)
        buttonsBox.appendChild(btnCopy)
        btnLike.appendChild(btnLikeImg)
        btnDownload.appendChild(btnDownloadImg)
        btnCopy.appendChild(btnCopyImg)
        titlesBox.appendChild(creator)
        titlesBox.appendChild(title)
        layer.style.display = 'none'

        btnDownloadImg.src = '/assets/icon-download.svg'
        btnLikeImg.src = '/assets/icon-fav-active.svg'
        btnCopyImg.src = '/assets/icon-max-normal.svg'
        btnDownload.className = 'icons-buttons-box'
        gif.className = 'animated-element'
        btnLike.className = 'icons-buttons-box'
        btnCopy.className = 'icons-buttons-box'
        buttonsBox.className = 'buttons-box flex-container'
        titlesBox.className = 'titles-box'
        title.className = "title-gif-results"
        creator.className = "figcaption-creator"
        layer.className = 'layer-hover'
        figure.className = 'cards'

        gif.src = element.link
        title.innerHTML = element.name

        if(element.author === null){
            creator.innerHTML = 'Autor desconocido'
        }else{
            creator.innerHTML = element.author
        }

        let btnLikeActive = false;

        btnLike.addEventListener('click', async () => {              
            btnLikeImg.src = '/assets/icon-fav.svg'
            removeItem(element.id)
        })

        btnCopy.addEventListener("copy", () => {
            alert("se ha copiado correcctamente")
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

            btnLike.addEventListener('mouseover', (element) => {
                if(btnLikeActive === false){
                    element.target.src = '/assets/icon-fav-hover.svg'
                }
            })

            btnLike.addEventListener('mouseout', (element) => {
                if(btnLikeActive === false){
                    element.target.src = '/assets/icon-fav-active.svg'
                }
            })
        }
    })
}

renderLikedCards()

