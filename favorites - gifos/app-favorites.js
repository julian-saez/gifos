/**
 * COMUNICACIÓN CON LA API
 */

const urlTrending = "http://api.giphy.com/v1/gifs/trending?api_key=3573pz5lsjTE2QvU9Ii5g3t7Ky3svfUm&limit=6";
let arrayTrendings = [];

function getTrendings(){
    fetch(urlTrending)
    .then(res => res.json() )
    .then(res => {
        // Recorro los objetos del request
        res.data.forEach(element => {   
            let valores = element;

        // Pusheo los objetos al array "arrayTrendings"
        arrayTrendings.push(valores);
    })
    printTrendings()
    })
    .catch((error) => {
        console.log(error)
    })
}

getTrendings()

// Función para cargar los gifs trendings
let container = document.getElementById("list-gifs")

const resize = () => {
    if(innerWidth > 768) {
        btnVisibility()
    }else{
        btnMobileNext()
    }
}
let idTrend = 0;
function printTrendings(){
    for(let i = 0; i <= 2; ++i){
        // Creo los elementos
        let gifBox = document.createElement("img")
        let title = document.createElement("h2")
        let username = document.createElement("h3")

        // Declaro los hijos de la caja de los gifs
        gifBox.appendChild(title)
        gifBox.appendChild(username)

        // Le coloco los idTren a cada caja y les agrego el titulo y la url del gif
        gifBox.idTrend = `trend${idTrend}`
        title.innerHTML = arrayTrendings[idTrend].title
        username.innerHTML = `Creator: ${arrayTrendings[idTrend].username}`
        gifBox.src = arrayTrendings[idTrend].images.original.url

        // Declaro a las boxes como hijo de container 

        container.appendChild(gifBox)

        // Aumento el valor de idTrend para luego iterar nuevamente sobre los idTrend de las boxes
        idTrend = idTrend + 1;
    }
    if(idTrend >= 3){
        resize()
    }
}


// Función para mostrar los botones de back y next en DESKTOP
const btnVisibility = () => {
    let btnBack = document.createElement("button")
    let btnBackIMG = document.createElement("img")
    btnBackIMG.src = 'assets/button-slider-left.svg'
    btnBack.id = 'btn-back-trendings'

    let btnNext = document.createElement("button")
    let btnNextIMG = document.createElement("img")
    btnNextIMG.src = 'assets/Button-Slider-right.svg'
    btnNext.id = 'btn-more-trendings'


    // Posiciono los botones de atras y siguiente
    // container.insertBefore(btnBack, container.children[0])
    container.insertAdjacentElement('beforebegin',btnBack)
    container.insertAdjacentElement('afterend',btnNext)

    btnBack.appendChild(btnBackIMG)
    btnNext.appendChild(btnNextIMG)

    btnNext.addEventListener("click", () => {
        printTrendings()
    })
}


// Función para mostrar el boton de next en MOBILE
const btnMobileNext = () => {
    let btnShowMore = document.createElement("button")
    let btnImg = document.createElement("img")
    container.appendChild(btnShowMore)
    btnShowMore.appendChild(btnImg)

    btnImg.src = "assets/Button-Slider-right.svg"
    btnShowMore.id = "btn-more-trendings"
}




/**
 * CONTENEDOR PARA MOSTRAR LOS GIFS
 */

let containerFavorites = document.getElementById("container-favorites")

let arrayFavorites = []
console.log(arrayFavorites)

// Obtengo los gifs que le di me gusta en el home
arrayFavorites.push(JSON.parse(localStorage.getItem("Favorites")))

// Creo las cajas con los gifs
for(let i = 0;i <= arrayFavorites.length; ++i){
    let gif = document.createElement("img")
    let title = document.createElement("h3")
    let creator = document.createElement("h4")
    let btnDg = document.createElement("button")
    let btnDgImg = document.createElement("img")
    let btnLike = document.createElement("button")
    let likeImg = document.createElement("img")

    gif.appendChild(title)
    gif.appendChild(creator)
    gif.appendChild(btnDg)
    gif.appendChild(btnLike)
    btnDg.appendChild(btnDgImg)
    btnLike.appendChild(likeImg)

    gif.src = arrayFavorites[i].title

    
    containerFavorites.appendChild(gif)
}




