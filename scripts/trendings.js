/*************     GIFOS TRENDINGS    *************/

// Almaceno los endpoints que usaré más adelante
const apiKey = '3573pz5lsjTE2QvU9Ii5g3t7Ky3svfUm'
const categoriesUrl = 'http://api.giphy.com/v1/gifs/categories'
const urlTrending = "http://api.giphy.com/v1/gifs/trending?"

// Contenedores del DOM
const trendingsCategoriesContainer = document.getElementById('categories')
const trendingsGifsContainer = document.getElementById("list-gifs")
const homeSectionContainer = document.getElementById("home")
const messageContent = document.getElementById("message-content")

// Botones de GIFOS TRENDING
const btnNextG = document.getElementById("btn-next")
const btnBackG = document.getElementById("btn-back")


/*************     PROGRAMA PARA OBTENER LAS CATEGORIAS DE GIFS MÁS BUSCADOS     *************/

let categories = []

const getCategories = async () => {
    /**
     * Ahora le pregunto si la variable "trendingsCategoriesContainer" existe ya que en el archivo Favorites no necesito mostrar las categorias. Si es indiferente de undefined, entonces si renderizo las sugerencias de la api ya que sería para la página Home. 
     */
    if(trendingsCategoriesContainer != undefined){
        // Busco las categorias trending
        let res = await fetch(`${categoriesUrl}?&api_key=${apiKey}&limit=5`)
        let resJS = await res.json();

        // Pusheo los objetos al array 'categories'
        resJS.data.forEach(element => {
            categories.push(element.name)
        })

        // Muestro las palabras claves por el DOM
        categories.forEach(element => {
            let keywordText = document.createElement("p")
            
                trendingsCategoriesContainer.appendChild(keywordText)
                        // Si ya la iteracíon va por el último índice del array, entonces no le coloco la coma.
                if(element === categories[4]){
                    keywordText.innerHTML = element[0].toUpperCase() + element.slice(1)
                }else{
                    keywordText.innerHTML = `${element[0].toUpperCase() + element.slice(1)},`
                }
        })
    }
};

getCategories()



/*************     PROGRAMA PARA OBTENER LOS GIFS TRENDINGS Y COLOCARLOS EN LA SECCIÓN 'TRENDING GIFOS'     *************/

let arrayTrendings = [];
let offset = 50;
let limitResults;

const getTrendings = () => {
    fetch(`${urlTrending}&api_key=${apiKey}&limit=25`)
    .then(res => res.json() ) 
    .then(res => {
        limitResults = res.pagination.total_count
        res.data.forEach(element => {   
            arrayTrendings.push(element);
        })
        trendingRender()
    })
    .catch((error) => {
        console.log(error)
    })
}

getTrendings()


// const resize = () => {
//     if(innerWidth < 768) btnMobileNext()
// }

let idTrend = 0;
let idit = 1;
let btnNextMobileState = false
let amountGifsTrendings = 2;


// Función para cargar los gifs trendings
function trendingRender(){
    // if(innerWidth < 480){
    //     btnNextMobile()
    // }
    
    if(trendingsGifsContainer.childElementCount == 0){
        for(let i = 0; i <= amountGifsTrendings; ++i){
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

            // Declaro los hijos de los botones
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
            btnDownloadImg.src = 'assets/icon-download.svg'
            btnLikeImg.src = 'assets/icon-fav.svg'
            btnExtendImg.src = 'assets/icon-max-normal.svg'
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
            idit += 1;
    
            let btnLikeActive = false;

            btnLike.addEventListener('click', async (element) => {
                saveFavoritesAtLocalStorage(gifElementImg.currentSrc, title.outerText, author.outerText)
                btnLikeImg.style.zIndex = '2'
                element.target.src = 'assets/icon-fav-active.svg'
                btnLikeActive = true;
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
                    console.log(btnLikeActive)
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
                    imgExitBtn.src = "assets/close.svg"
                    gifExtend.innerHTML = gifElementImg.currentSrc
                    authorExtend.innerHTML = author.innerHTML
                    titleExtend.classList = "title-gif-results"
                    authorExtend.classList = "figcaption-creator"
    
                    homeSectionContainer.appendChild(extendedGifContainer)
                    // Elimino el div que contiene el gif, el titulo, user, me gusta y descarga
                    exitBtn.addEventListener("click", () => {
                        extendedGifContainer.remove(gifExtend)
                    })
                })
            }
        }
    }else(trendingsGifsContainer.childElementCount == 2);{
        return true;
    }

    if(idTrend >= 3){
        resize()
    }
}

// 

const btnNextMobile = () => {
    if(btnNextMobileState === false){
        btnNextG.style.display = 'none'
        let btnNext = document.createElement("button")
        let btnNextImg = document.createElement("img")
        trendingsGifsContainer.appendChild(btnNext)
        btnNext.appendChild(btnNextImg)
        btnNextImg.src = "assets/Button-Slider-right.svg"
        btnNext.innerHTML = "Ver mas"
        btnNextMobileState = true
        console.log("estoy ejecutando la funcion")
    }
}

// Variable para ir iterando el indice y mostrar diferentes gifs
let position = 2;

// Llamo el elemento donde mostraré el mensaje 'Llegaste al inicio' si ya no hay más gifs anteriores que mostrar

let limitPosition = 40;

// Boton para ver los gifs siguientes
btnNextG.addEventListener('click', () => {
        // Borro el mensaje de 'LLegaste al inicio' si se tocó alguna vez el boton de 'volver'
        messageContent.children[0].innerText = ''

        // Plasmo los nuevos resultados
        trendingsGifsContainer.children[0].setAttribute('src', '')
        trendingsGifsContainer.children[0].setAttribute('src', arrayTrendings[position + 1].images.preview_webp.url)

        trendingsGifsContainer.children[1].setAttribute('src', '')
        trendingsGifsContainer.children[1].setAttribute('src', arrayTrendings[position + 2].images.preview_webp.url)

        trendingsGifsContainer.children[2].setAttribute('src', '')
        trendingsGifsContainer.children[2].setAttribute('src', arrayTrendings[position + 3].images.preview_webp.url)
        btnBackG.children[0].setAttribute('src', '/assets/button-slider-left-hover.svg')

        // Le aumento el valor a la variable por si el usuario vuelve a pedir nuevos resultados o para no olvidar el índice del src
        position += 3;

        if(position >= limitPosition){
            getMoreTrendings()
            limitPosition += 40;
            offset += 50;
        }
})

const getMoreTrendings = () => {
    fetch(`${urlTrending}&limit=50&offset=${offset}`)
    .then(res => res.json() ) 
    .then(res => {
        // Recorro los objetos del request
        res.data.forEach(element => {   
            let gifs = element;
        // Pusheo los objetos al array "arrayTrendings"
        arrayTrendings.push(gifs);
    })
    .catch((error) => {
        console.log(error)
    })
})}


// Boton para ver los gifs anteriores
btnBackG.addEventListener("click", () => {
    // Pregunto si el indice del src es == a 0, y si es así, muestro el mensaje...
    if(trendingsGifsContainer.children[0].src == arrayTrendings[0].images.preview_webp.url){
        messageContent.children[0].innerText = "¡Volviste al inicio!"
    }else{
        // Si es indiferente de 0, itero los resultados anteriores...
        if(trendingsGifsContainer.children[0].src == arrayTrendings[3].images.preview_webp.url){
            btnBackG.children[0].setAttribute('src', 'assets/button-slider-left.svg')
        }

        // Plasmo los resultados
        trendingsGifsContainer.children[0].setAttribute('src', '')
        trendingsGifsContainer.children[1].setAttribute('src', '')
        trendingsGifsContainer.children[2].setAttribute('src', '')
    
        trendingsGifsContainer.children[0].setAttribute('src', arrayTrendings[position - 5].images.preview_webp.url)
        trendingsGifsContainer.children[1].setAttribute('src', arrayTrendings[position - 4].images.preview_webp.url)
        trendingsGifsContainer.children[2].setAttribute('src', arrayTrendings[position - 3].images.preview_webp.url)
    
        // Resto la posición por si se vulve a tocar el botón de volver atrás
        position = position - 3;
    }
})



