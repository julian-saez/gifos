/*************     GIFOS TRENDINGS    *************/

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
        console.log(res)
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
            // Elementos caja
            let figureElement = document.createElement("figure")
            let gifElementImg = document.createElement("img")
            let layer = document.createElement('div')
            trendingsGifsContainer.appendChild(figureElement)
            figureElement.appendChild(gifElementImg)
            figureElement.appendChild(layer)

            let title = document.createElement("figcaption")
            let author = document.createElement("figcaption")
    
            // Division de los contenedores
            let buttonsBox = document.createElement("div")
            let titlesBox = document.createElement("div")

            // Botones al pasar el mouse
            let btnLike = document.createElement("button")
            let btnDownload = document.createElement("button")
            let btnExtend = document.createElement("button")

            // Iconos para los botones
            let btnLikeImg = document.createElement("img")
            let btnDownloadImg = document.createElement("img")
            let btnExtendImg = document.createElement("img")

            // Declaro los hijos de...
            figureElement.appendChild(layer)
            layer.appendChild(buttonsBox)
            layer.appendChild(titlesBox)
            layer.style.display = 'none'
            buttonsBox.appendChild(btnLike)
            buttonsBox.appendChild(btnDownload)
            buttonsBox.appendChild(btnExtend)
            btnLike.appendChild(btnLikeImg)
            btnDownload.appendChild(btnDownloadImg)
            btnExtend.appendChild(btnExtendImg)
            titlesBox.appendChild(author)
            titlesBox.appendChild(title)

            // Atributos de los elementos
            figureElement.classList = "cardGifs"
            btnDownloadImg.src = '/assets/icon-download.svg'
            btnLikeImg.src = '/assets/icon-fav.svg'
            btnExtendImg.src = '/assets/icon-max-normal.svg'
            btnDownload.classList = 'icons-buttons-box'
            btnLike.classList = 'icons-buttons-box'
            btnExtend.classList = 'icons-buttons-box'
            buttonsBox.classList = 'buttons-box flex-container'
            titlesBox.classList = 'titles-box'
            title.classList = "title-gif-results"
            author.classList = "figcaption-creator"

            if(arrayTrendings[i].username == ""){
                author.innerHTML = 'Autor desconocido'
            }else{
                author.innerHTML = `${arrayTrendings[i].username}`
            }

            gifElementImg.classList = "gifs-trendings"
            title.innerHTML = arrayTrendings[i].title
            gifElementImg.src = arrayTrendings[i].images.preview_webp.url
    
            let btnLikeState = false;
            btnLike.addEventListener('click', async (element) => {
                saveFavoritesAtLocalStorage(gifElementImg.currentSrc, title.outerText, author.outerText)
                btnLikeImg.style.zIndex = '2'
                element.target.src = '/assets/corazonsito.svg'
                btnLikeState = true;
            })

            btnLike.addEventListener('mouseover', (element) => {
                if(btnLikeState === false){
                    element.target.src = '/assets/icon-fav-js.svg'
                }
            })

            btnLike.addEventListener('mouseout', (element) => {
                if(btnLikeState === false){
                    element.target.src = '/assets/icon-fav.svg'
                }
            })
            
            if(innerWidth > 768){
                figureElement.addEventListener('mouseover', () => {
                    layer.style.display = 'block'
                    layer.classList = 'layerTrendingsBackground'
                    title.style.color = '#ffffff'
                    title.style.opacity = '1'
                    title.style.zIndex = '4'
                })

                figureElement.addEventListener("mouseout", () => {
                    layer.className = ''
                    layer.style.display = 'none'
                })   

                btnExtend.addEventListener("click", () => {
                    // Creo los elementos
                    let extendedGifContainer = document.createElement("figure")
                    let extendedGifTopContainer = document.createElement("div")
                    let extendedGifBottomContainer = document.createElement("div")
                    let gifExtend = document.createElement("img")
                    let exitBtn = document.createElement("button")
                    let imgExitBtn = document.createElement("img")
                    let authorExtend = document.createElement("figcaption")
                    let titleExtend = document.createElement("figcaption")
    
                    // Declaro los hijos de los elementos
                    extendedGifContainer.appendChild(extendedGifTopContainer)
                    extendedGifContainer.appendChild(extendedGifBottomContainer)
    
                    // Boton salir
                    extendedGifTopContainer.appendChild(exitBtn)
                    exitBtn.appendChild(imgExitBtn)
    
                    //Gif
                    extendedGifTopContainer.appendChild(gifExtend)
    
                    // Titulo del gif y creador
                    extendedGifBottomContainer.appendChild(authorExtend)
                    extendedGifBottomContainer.appendChild(titleExtend)

    
                    // Le asignó los atributos a los elementos creados 
                    extendedGifTopContainer.className = "flex-container"
                    extendedGifBottomContainer.className = "flex-container"
                    extendedGifTopContainer.id = "extended-gif-top-container"
                    extendedGifBottomContainer.id = "extended-gif-bottom-container"
                    extendedGifContainer.id = "div-container-results"
                    gifExtend.src = gifElementImg.currentSrc
                    imgExitBtn.src = "/assets/close.svg"
                    gifExtend.innerHTML = gifElementImg.currentSrc
                    authorExtend.innerHTML = author.innerHTML
                    titleExtend.classList = "title-gif-results"
                    authorExtend.classList = "figcaption-creator"
                    exitBtn.classList = "buttons-styles"
    
                    homeSectionContainer.appendChild(extendedGifContainer)
                    // Elimino el div que contiene el gif, el titulo, user, me gusta y descarga
                    exitBtn.addEventListener("click", () => {
                        extendedGifContainer.remove(gifExtend)
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
    console.log(newFavoritesGifs)
    favoritesGifs = newFavoritesGifs
    saveFavoritesAtLocalStorage()
}

let y = 0
let trendingsRenderMobile = () => {
    for(y; y <= itemsToRender; ++y){
        // Elementos caja
        let figureElement = document.createElement("figure")
        let gifElementImg = document.createElement("img")
        let layer = document.createElement('div')
        trendingsGifsContainer.appendChild(figureElement)
        figureElement.appendChild(gifElementImg)
        figureElement.appendChild(layer)

        let title = document.createElement("figcaption")
        let author = document.createElement("figcaption")

        // Division de los contenedores
        let buttonsBox = document.createElement("div")
        let titlesBox = document.createElement("div")

        // Botones al pasar el mouse
        let btnLike = document.createElement("button")
        let btnDownload = document.createElement("button")
        let btnExtend = document.createElement("button")

        // Iconos para los botones
        let btnLikeImg = document.createElement("img")
        let btnDownloadImg = document.createElement("img")
        let btnExtendImg = document.createElement("img")

        // Declaro los hijos de...
        figureElement.appendChild(layer)
        layer.appendChild(buttonsBox)
        layer.appendChild(titlesBox)
        layer.style.display = 'none'
        buttonsBox.appendChild(btnExtend)
        btnLike.appendChild(btnLikeImg)
        btnDownload.appendChild(btnDownloadImg)
        btnExtend.appendChild(btnExtendImg)
        titlesBox.appendChild(author)
        titlesBox.appendChild(title)

        // Atributos de los elementos
        figureElement.classList = "cardGifs"
        btnDownloadImg.src = '/assets/icon-download.svg'
        btnLikeImg.src = '/assets/icon-fav.svg'
        btnExtendImg.src = '/assets/icon-max-normal.svg'
        btnDownload.classList = 'icons-buttons-box'
        btnLike.classList = 'icons-buttons-box'
        btnExtend.classList = 'icons-buttons-box'
        buttonsBox.classList = 'buttons-box flex-container'
        titlesBox.classList = 'titles-box'
        title.classList = "title-gif-results"
        author.classList = "figcaption-creator"

        if(arrayTrendings[y].username == ""){
            author.innerHTML = 'Autor desconocido'
        }else{
            author.innerHTML = `${arrayTrendings[y].username}`
        }

        gifElementImg.classList = "gifs-trendings"
        title.innerHTML = arrayTrendings[y].title
        gifElementImg.src = arrayTrendings[y].images.preview_webp.url

        figureElement.addEventListener("click", () => {
            // Creo los elementos
            let extendedGifContainer = document.createElement("figure")
            let extendedGifTopContainer = document.createElement("div")
            let extendedGifBottomContainer = document.createElement("div")
            let leftSectionFromBottomContainer = document.createElement("div")
            let rightSectionFromBottomContainer = document.createElement("div")
            let gifExtend = document.createElement("img")
            let exitBtn = document.createElement("button")
            let imgExitBtn = document.createElement("img")
            let authorExtend = document.createElement("figcaption")
            let titleExtend = document.createElement("figcaption")

            // Declaro los hijos de los elementos
            extendedGifContainer.appendChild(extendedGifTopContainer)
            extendedGifContainer.appendChild(extendedGifBottomContainer)
            extendedGifBottomContainer.appendChild(leftSectionFromBottomContainer)
            extendedGifBottomContainer.appendChild(rightSectionFromBottomContainer)

            // Boton salir
            extendedGifTopContainer.appendChild(exitBtn)
            exitBtn.appendChild(imgExitBtn)

            //Gif
            extendedGifTopContainer.appendChild(gifExtend)

            // Titulo del gif y creador
            leftSectionFromBottomContainer.appendChild(authorExtend)
            leftSectionFromBottomContainer.appendChild(titleExtend)

            rightSectionFromBottomContainer.appendChild(btnDownload)
            rightSectionFromBottomContainer.appendChild(btnLike)


            // Le asignó los atributos a los elementos creados 
            extendedGifTopContainer.className = "flex-container"
            extendedGifBottomContainer.className = "flex-container"
            extendedGifTopContainer.id = "extended-gif-top-container"
            extendedGifBottomContainer.id = "extended-gif-bottom-container"
            leftSectionFromBottomContainer.id = "left-section-from-bc"
            rightSectionFromBottomContainer.id = "right-section-from-bc"
            extendedGifContainer.id = "div-container-results"
            gifExtend.src = gifElementImg.currentSrc
            gifExtend.id = "gif-extend-img"
            imgExitBtn.src = "/assets/close.svg"
            gifExtend.innerHTML = gifElementImg.currentSrc
            authorExtend.innerHTML = author.innerHTML
            titleExtend.innerHTML = title.innerHTML
            titleExtend.classList = "title-gif-results"
            authorExtend.classList = "figcaption-creator"
            exitBtn.classList = "buttons-styles"

            homeSectionContainer.appendChild(extendedGifContainer)
            // Elimino el div que contiene el gif, el titulo, user, me gusta y descarga
            exitBtn.addEventListener("click", () => {
                extendedGifContainer.remove(gifExtend)
            })



            let btnLikeState = false;
            let nombre = titleExtend.innerHTML
            const gifSeleccionado = favoritesGifs.find(element => element.nombre === nombre)
            if(gifSeleccionado){
                btnLikeImg.src = '/assets/corazonsito.svg'
                btnLikeState = true
            }
            favoritesGifTrendings = favoritesGifs
            elementsFavoritesLength = favoritesGifTrendings.length
            btnLike.addEventListener('click', async (element) => {
                if(btnLikeState === false){
                    saveFavoritesAtLocalStorage(gifElementImg.currentSrc, title.outerText, author.outerText)
                    btnLikeImg.style.zIndex = '2'
                    element.target.src = '/assets/corazonsito.svg'
                    btnLikeState = true;
                }else{
                    btnLikeState = false;
                    let gifData = gifElementImg.currentSrc
                    console.log(gifData)
                    element.target.src = '/assets/icon-fav.svg'
                    removeFavoriteItem(gifData)
                }
            })



        })
    }
}



// Variable para ir iterando el indice y mostrar diferentes gifs
let position = 2;

// Llamo el elemento donde mostraré el mensaje 'Llegaste al inicio' si ya no hay más gifs anteriores que mostrar
let btnNextClicks = 0;
let clicksToGetMoreItems = 12;

// Boton para ver los gifs siguientes
if(innerWidth < 480){
    btnNextG.addEventListener('click', () => {
        itemsToRender += 3
        trendingsRenderMobile()
        // Compruebo la cantidad de clicks que el usuario realizo para que al llegar aL valor de clicksToGetMoreItems, se realice un request con nuevos resultados
        if(btnNextClicks === clicksToGetMoreItems){
            clicksToGetMoreItems += 12;
            offset += 50;
            getTrendings()
        }
    })
}else{
    btnNextG.addEventListener('click', () => {
        btnNextClicks += 1
        // Borro el mensaje de 'LLegaste al inicio' si se tocó alguna vez el boton de 'volver'
        messageContent.children[0].innerText = ''
    
        // Plasmo los nuevos resultados
        trendingsGifsContainer.children[0].children[0].setAttribute('src', '')
        trendingsGifsContainer.children[0].children[0].setAttribute('src', arrayTrendings[position + 1].images.preview_webp.url)
    
        trendingsGifsContainer.children[1].children[0].setAttribute('src', '')
        trendingsGifsContainer.children[1].children[0].setAttribute('src', arrayTrendings[position + 2].images.preview_webp.url)
    
        trendingsGifsContainer.children[2].children[0].setAttribute('src', '')
        trendingsGifsContainer.children[2].children[0].setAttribute('src', arrayTrendings[position + 3].images.preview_webp.url)
        btnBackG.children[0].setAttribute('src', '/assets/button-slider-left-hover.svg')
    
        // Le aumento el valor a la variable por si el usuario vuelve a pedir nuevos resultados o para no olvidar el índice del src
        position += 3;
    
        // Compruebo la cantidad de clicks que el usuario realizo para que al llegar aL valor de clicksToGetMoreItems, se realice un request con nuevos resultados
        if(btnNextClicks === clicksToGetMoreItems){
            clicksToGetMoreItems += 12;
            offset += 50;
            getTrendings()
        }
    })
}


// Boton para ver los gifs anteriores
btnBackG.addEventListener("click", () => {
    // Pregunto si el indice del src es == a 0, y si es así, muestro el mensaje...
    if(trendingsGifsContainer.children[0].children[0].src == arrayTrendings[0].images.preview_webp.url){
        messageContent.children[0].innerText = "¡Volviste al inicio!"

    }else{
        // Si es indiferente de 0, itero los resultados anteriores...
        if(trendingsGifsContainer.children[0].src == arrayTrendings[3].images.preview_webp.url){
            btnBackG.children[0].setAttribute('src', '/assets/button-slider-left-hover.svg')
        }

        // Plasmo los resultados
        trendingsGifsContainer.children[0].children[0].setAttribute('src', '')
        trendingsGifsContainer.children[1].children[0].setAttribute('src', '')
        trendingsGifsContainer.children[2].children[0].setAttribute('src', '')
    
        trendingsGifsContainer.children[0].children[0].setAttribute('src', arrayTrendings[position - 5].images.preview_webp.url)
        trendingsGifsContainer.children[1].children[0].setAttribute('src', arrayTrendings[position - 4].images.preview_webp.url)
        trendingsGifsContainer.children[2].children[0].setAttribute('src', arrayTrendings[position - 3].images.preview_webp.url)
    
        // Resto la posición por si se vulve a tocar el botón de volver atrás
        position = position - 3;
    }
})



