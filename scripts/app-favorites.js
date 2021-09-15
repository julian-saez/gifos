/**
 * PROGRAMA PARA OBTENER LOS GIFS FAVORITOS DEL USUARIO MEDIANTE LOCALSTORAGE
 */

const noContentContainer = document.getElementById("no-content")
const favoritesContainer = document.getElementById("favorites-container")
let favoritesGifs = []
let amountElementsFavorites;

const saveFavoritesAtLocalStorage = async (url, name, author) => {
    if(url != null){
        let favorite = {
            enlace: url,
            nombre: name,
            author: author
        }
        favoritesGifs.push(favorite)
    }
    localStorage.setItem("Favorites", JSON.stringify(favoritesGifs))
}

const getFavoritesFromLocalStorage = () => {
    let items = JSON.parse(localStorage.getItem("Favorites"))
    if(items != null){
        items.forEach(element => {
            favoritesGifs.push(element)
        })
        noContentContainer.className = "display-none"
    }else{
        noContentContainer.style.display = "display-block"
    }
    amountElementsFavorites = favoritesGifs.length
}

const removeFavoriteGif = (element) => {
    let newFavoritesGifs = []
    for(let i = 0; i < amountElementsFavorites; i++) {
      if(favoritesGifs[i].enlace !== element){
        newFavoritesGifs.push(favoritesGifs[i]);
      }
    }
    favoritesGifs = newFavoritesGifs
    saveFavoritesAtLocalStorage()
}

// Ejecuto la función enseguida ni bien arranca la aplicación web
getFavoritesFromLocalStorage()

const renderFavoritesGifs = () => {
    console.log("Estoy funcando")
    favoritesGifs.forEach(element => {
        let figure = document.createElement("figure")
        let layer = document.createElement("div")
        let gif = document.createElement("img") 
        let title = document.createElement("figcaption") 
        let creator = document.createElement("figcaption")

        // Botones al pasar el mouse
        let btnLike = document.createElement("button")
        let btnDownload = document.createElement("button")
        let btnCopy = document.createElement("button")

        // Iconos para los botones
        let btnLikeImg = document.createElement("img")
        let btnDownloadImg = document.createElement("img")
        let btnCopyImg = document.createElement("img")

        // Division de los contenedores
        let buttonsBox = document.createElement("div")
        let titlesBox = document.createElement("div")

        favoritesContainer.appendChild(figure)
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
        gif.className = 'gif-url'
        btnLike.className = 'icons-buttons-box'
        btnCopy.className = 'icons-buttons-box'
        buttonsBox.className = 'buttons-box flex-container'
        titlesBox.className = 'titles-box'
        title.className = "title-gif-results"
        creator.className = "figcaption-creator"
        layer.className = 'layer-hover'
        figure.className = 'cardGifs'

        gif.src = element.enlace
        title.innerHTML = element.nombre

        if(element.author === null){
            creator.innerHTML = 'Autor desconocido'
        }else{
            creator.innerHTML = element.author
        }

        let btnLikeActive = false;

        btnLike.addEventListener('click', async () => {
            if(btnLikeActive === true){
                btnLikeActive = false
                saveFavoritesAtLocalStorage(gif.currentSrc, title.innerHTML, creator.innerHTML)
            }else{                
                btnLikeImg.src = '/assets/icon-fav.svg'
                btnLikeActive = true
                let gifData = gif.currentSrc
                removeFavoriteGif(gifData)
            }
        })

        btnCopy.addEventListener("copy", () => {
            alert("se ha copiado correcctamente")
        })
    
        if(innerWidth > 768){
            figure.addEventListener("mouseover", () => {
                layer.style.display = 'block'
                layer.className = 'layerBackground'
                title.style.color = '#ffffff'
                title.style.opacity = '1'
                title.style.zIndex = '4'
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

renderFavoritesGifs()


