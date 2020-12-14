/**
 * COMUNICACIÓN CON LA API
 */

const urlTrending = "http://api.giphy.com/v1/gifs/trending?api_key=3573pz5lsjTE2QvU9Ii5g3t7Ky3svfUm";
let arrayTrendings = [];

function getTrendings(){
    fetch(`${urlTrending}&limit=15`)
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


let container = document.getElementById("list-gifs")

const resize = () => {
    if(innerWidth > 768) {
        btnVisibility()
    }else{
        btnMobileNext()
    }
}

// Variable para comprobar si el ancho del viewport es mobile o desktop
let idTrend = 0;

// Función para cargar los gifs trendings
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

let iOne = 0;
let iTwo = 1;
let iThree = 2;

let btnNextG = document.getElementById("btn-next")


// Función para mostrar los botones de back y next en DESKTOP
const btnVisibility = () => {
    let btnBack = document.createElement("button")
    let btnBackIMG = document.createElement("img")
    btnBackIMG.src = 'assets/button-slider-left.svg'
    btnBack.id = 'btn-back-trendings'

    btnNext = document.createElement("button")
    let btnNextIMG = document.createElement("img")
    btnNextIMG.src = 'assets/Button-Slider-right.svg'
    btnNext.id = 'btn-more-trendings'


    // Posiciono los botones de atras y siguiente
    // container.insertBefore(btnBack, container.children[0])
    container.insertAdjacentElement('beforebegin',btnBack)
    container.insertAdjacentElement('afterend',btnNext)

    btnBack.appendChild(btnBackIMG)
    btnNext.appendChild(btnNextIMG)
}

btnNextG.addEventListener("click", () => {
    iOne += 3;
    iTwo += 3;
    iThree += 3;
    function overwritten() {
        container.children[0].setAttribute('src', '')
        container.children[1].setAttribute('src', '')
        container.children[2].setAttribute('src', '')

        let img1 = container.children[0]
        let img2 = container.children[1]
        let img3 = container.children[2]

        img1.src = arrayTrendings[iOne].images.preview_webp.url
        img2.src = arrayTrendings[iTwo].images.preview_webp.url
        img3.src = arrayTrendings[iThree].images.preview_webp.url
    }
    overwritten()
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