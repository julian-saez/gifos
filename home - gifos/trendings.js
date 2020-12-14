/**
 * COMUNICACIÓN CON LA API
 */

const urlTrending = "http://api.giphy.com/v1/gifs/trending?api_key=3573pz5lsjTE2QvU9Ii5g3t7Ky3svfUm";
let arrayTrendings = [];

function getTrendings(){
    fetch(`${urlTrending}&limit=15&offset=15`)
    .then(res => res.json() )
    .then(res => {
        // Recorro los objetos del request
        res.data.forEach(element => {   
            let valores = element;

        // Pusheo los objetos al array "arrayTrendings"
        arrayTrendings.push(valores);
        console.log(arrayTrendings)
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
    if(innerWidth < 768) {
        btnMobileNext()
    }
}

// Variable para comprobar si el ancho del viewport es mobile o desktop
let idTrend = 0;

// Función para cargar los gifs trendings
function printTrendings(){
    if(container.childElementCount == 0){
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
            gifBox.src = arrayTrendings[idTrend].images.preview_webp.url
    
            // Declaro a las boxes como hijo de container 
    
            container.appendChild(gifBox)
    
            // Aumento el valor de idTrend para luego iterar nuevamente sobre los idTrend de las boxes
            idTrend = idTrend + 1;
        }
    }else(container.childElementCount == 2);{
        console.log("Esta todo OK")
    }

    if(idTrend >= 3){
        resize()
    }
}

let iOne = 0;
let iTwo = 1;
let iThree = 2;

let restOne = 3;


let requestCount = 10;

let btnNextG = document.getElementById("btn-next")
let btnBackG = document.getElementById("btn-back")

btnNextG.addEventListener("click", () => {
    restOne -= 3
    iOne += 3;
    iTwo += 3;
    iThree += 3;
    function overwritten() {
        if(iThree >= requestCount){
            getTrendings()
            requestCount += 15;
        }
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

btnBackG.addEventListener("click", () => {
    container.children[0].setAttribute('src', '')
    container.children[1].setAttribute('src', '')
    container.children[2].setAttribute('src', '')

    let img1 = container.children[0]
    let img2 = container.children[1]
    let img3 = container.children[2]

    img1.src = arrayTrendings[iOne - restOne].images.preview_webp.url
    img2.src = arrayTrendings[iTwo - restOne].images.preview_webp.url
    img3.src = arrayTrendings[iThree - restOne].images.preview_webp.url
    restOne += 3
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