/*************     GIFOS TRENDINGS    *************/

// Almaceno los endpoints que usaré más adelante
const apiKey = '3573pz5lsjTE2QvU9Ii5g3t7Ky3svfUm'
const categoriesUrl = 'http://api.giphy.com/v1/gifs/categories'
const urlTrending = "http://api.giphy.com/v1/gifs/trending?api_key=3573pz5lsjTE2QvU9Ii5g3t7Ky3svfUm"

// Contenedores del DOM
const trendingsCategories = document.getElementById('categories')
const container = document.getElementById("list-gifs")
const contenedor = document.getElementById("home")
const messageContent = document.getElementById("message-content")

// Botones de GIFOS TRENDING
const btnNextG = document.getElementById("btn-next")
const btnBackG = document.getElementById("btn-back")


/*************     PROGRAMA PARA OBTENER LAS CATEGORIAS DE GIFS MÁS BUSCADOS     *************/

let categories = []

const getCategories = async () => {
    /**
     * Ahora le pregunto si la variable "trendingsCategories" existe ya que en el archivo Favorites no necesito mostrar las categorias. Si es indiferente de undefined, entonces si renderizo las sugerencias de la api ya que sería para la página Home. 
     */
    if(trendingsCategories != undefined){
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

            
                trendingsCategories.appendChild(keywordText)
                        // Si ya la iteracíon va por el último índice del array, entonces no le coloco la coma.
                if(element === categories[4]){
                    keywordText.innerHTML = element[0].toUpperCase() + element.slice(1)
                }else{
                    keywordText.innerHTML = `${element[0].toUpperCase() + element.slice(1)},`
                }
        })
    }
};

// Ejecuto la función ni bien comienza el programa
getCategories()



/*************     PROGRAMA PARA OBTENER LOS GIFS TRENDINGS Y COLOCARLOS EN LA SECCIÓN 'TRENDING GIFOS'     *************/

let arrayTrendings = [];
let offset = 50;
let limitResults;

const getTrendings = () => {
    fetch(`${urlTrending}&limit=50`)
    .then(res => res.json() ) 
    .then(res => {
        limitResults = res.pagination.total_count
        // Recorro los objetos del request
        res.data.forEach(element => {   
            let valores = element;

        // Pusheo los objetos al array "arrayTrendings"
        arrayTrendings.push(valores);
    })
    trendingRender()
    })
    .catch((error) => {
        console.log(error)
    })
}

getTrendings()


const resize = () => {
    if(innerWidth < 768) btnMobileNext()
}

let idTrend = 0;
let idit = 1;

// Función para cargar los gifs trendings
function trendingRender(){
    if(container.childElementCount == 0){
        for(let i = 0; i <= 2; ++i){
            // Creo los elementos
            
            let gifBox = document.createElement("img")
            // gifBox.style.visibility = 'visible'
            container.appendChild(gifBox)
            let hoverColor = document.createElement('div')
            gifBox.appendChild(hoverColor)

            let title = document.createElement("h2")
            let username = document.createElement("h3")
    
            // Declaro los hijos de la caja de los gifs
            gifBox.appendChild(title)
            gifBox.appendChild(username)
    
            // Le coloco los idTren a cada caja y les agrego el titulo y la url del gif
            gifBox.id = `trend${idit}`
            title.innerHTML = arrayTrendings[i].title
            username.innerHTML = `Creator: ${arrayTrendings[i].username}`
            gifBox.src = arrayTrendings[i].images.preview_webp.url

            idit += 1;

            gifBox.addEventListener('mouseover', () => {
                hoverColor.style.visibility = 'hidden'
                hoverColor.style.background = '#6742E7'
            })
    
            gifBox.addEventListener("click", e => {
                let url = e.target.getAttribute('src')
                let creator = e.target.querySelector("h3").innerText
                let title = e.target.querySelector("h2").innerText

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
                titleGif.innerHTML = title;
                creatorGif.innerHTML = creator;
                likeImg.src = "assets/icon-fav.svg"

                contenedor.appendChild(div)
                // Elimino el div que contiene el gif, el titulo, user, me gusta y descarga
                btnExit.addEventListener("click", () => {
                    div.remove(bigGif)
                })
                btnLike.addEventListener("click", () => {
                    likesUpload.push(new Likes(url , title[0].innerText, creator[0].innerText))
                    setTimeout(saveGifs, 750)
                    // localStorage.removeItem('Favorites')
                })
            })
        }

    }else(container.childElementCount == 2);{
        return true;
    }

    if(idTrend >= 3){
        resize()
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
        container.children[0].setAttribute('src', '')
        container.children[0].setAttribute('src', arrayTrendings[position + 1].images.preview_webp.url)

        container.children[1].setAttribute('src', '')
        container.children[1].setAttribute('src', arrayTrendings[position + 2].images.preview_webp.url)

        container.children[2].setAttribute('src', '')
        container.children[2].setAttribute('src', arrayTrendings[position + 3].images.preview_webp.url)
        btnBackG.children[0].setAttribute('src', 'assets/button-slider-left-hover.svg')

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
    if(container.children[0].src == arrayTrendings[0].images.preview_webp.url){
        messageContent.children[0].innerText = "¡Volviste al inicio!"
    }else{
        // Si es indiferente de 0, itero los resultados anteriores...
        if(container.children[0].src == arrayTrendings[3].images.preview_webp.url){
            btnBackG.children[0].setAttribute('src', 'assets/button-slider-left.svg')
        }

        // Plasmo los resultados
        container.children[0].setAttribute('src', '')
        container.children[1].setAttribute('src', '')
        container.children[2].setAttribute('src', '')
    
        container.children[0].setAttribute('src', arrayTrendings[position - 5].images.preview_webp.url)
        container.children[1].setAttribute('src', arrayTrendings[position - 4].images.preview_webp.url)
        container.children[2].setAttribute('src', arrayTrendings[position - 3].images.preview_webp.url)
    
        // Resto la posición por si se vulve a tocar el botón de volver atrás
        position = position - 3;
    }
})


// Función para mostrar el boton de next en MOBILE
const btnMobileNext = () => {
    let btnShowMore = document.createElement("button")
    let btnImg = document.createElement("img")
    container.appendChild(btnShowMore)
    btnShowMore.appendChild(btnImg)

    btnImg.src = "assets/Button-Slider-right.svg"
    btnShowMore.id = "btn-more-trendings"
}



