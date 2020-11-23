/**
 * COMUNICACIÓN CON LA API
 */


const urlTrendings = "http://api.giphy.com/v1/gifs/trending?api_key=3573pz5lsjTE2QvU9Ii5g3t7Ky3svfUm&limit=10";
var gifTrendingInfo = [];

function putTrendings(){
    fetch(urlTrendings)
    .then(res => res.json() )
    .then(res => {

        // Recorro los objetos del request
        res.data.forEach(element => {   
            let valores = element;

        // Pusheo los objetos al array "gifTrendingInfo"
        gifTrendingInfo.push(valores);
    })
    getTrending()
    })
    .catch(error => {
        console.log(error + `Error n° ${status}`)
    })

    // console.log(gifTrendingInfo)
}

putTrendings()



/**
 * CREO LOS CONTENEDORES DONDE ESTARÁN LOS GIFS
 */

// Declaro el nombre de las variables para luego crear los nombres de los elementos y llamarlos desde cualquier bloque.

var gifBox;
var title;
var username;

// Variable para ir iterando sobre los id de las boxes
var idNumber = 0;


// Función para cargar los gifs trendings

function getTrending (){
    for(let i = 0; i <= 2; ++i){

        // Creo los elementos
        gifBox = document.createElement("img")
        title = document.createElement("h2")
        username = document.createElement("h3")

        // Declaro los hijos de la caja de los gifs
        gifBox.appendChild(title)
        gifBox.appendChild(username)

        // Le coloco los id a cada caja y les agrego el titulo y la url del gif
        gifBox.id = `gfnumber${idNumber}`
        title.innerHTML = gifTrendingInfo[i].title
        username.innerHTML = `Creator: ${gifTrendingInfo[i].username}`
        gifBox.src = gifTrendingInfo[i].images.original.url

        // Declaro a las boxes como hijo de container 
        var container = document.getElementById("list-gifs")
        container.appendChild(gifBox)

        // Aumento el valor de idNumber para luego iterar nuevamente sobre los id de las boxes
        idNumber = idNumber + 1;
    }
}




/**
 * PROGRAMA PARA BUSCAR GIFS
 */

// Evento de la tecla ENTER

var input = document.getElementById('buscador')
input.addEventListener("keydown", function enterCode(e){
    var enter = e.which || e.keyCode;

    if(enter == 13){
        input.addEventListener("keyup", getText)
    }
})

// Varible para ir iterando en el offset y así mostrar nuevas imagenes
let contador = 0; 

// Variable para usarla luego en la condición
let iters = 0;

// Guardo los objetos que me da la API en este array
let results;

// LLamo al input y a través del evento tomo los valores que escribe el usuario y asocio la función GetText
var inputText;

let boxResult;
let titleResult;
let creatorResult;
let like;
let containerResults = document.getElementById("container-results")
let btnContainer = document.getElementById("btn-container")
let btnMore = document.createElement("button")

btnMore.addEventListener("click", moreResults)

async function moreResults () {
    contador += 11;
    await runAPI()
    showResults()
}

// Función para tomar el texto del input y buscarlo en la API

async function getText(value) {
    // Borro los resultados anteriores para subir nuevos
    results = [];

    // Obtengo el valor que coloque por el input
    inputText = value.path[0].value;

    // Creo la linea que separa los resultados con el subtitulo "Trendings"
    let line = document.getElementById("spacebetween");
    line.className = "line-active";

    // Nombre de lo que se busca
    let searchWord = document.getElementById("search-word")
    searchWord.innerHTML = inputText;

    await runAPI()

    // Pregunto si la variable ITERS es cero, si lo es, ejecuto la función que creará todos los elementos en el HTML, y si es > a 0 solo se ejecutará la función que sobre-escribira los resultados sobre los elementos ya creados.
    if(iters == 0){
        iters += 1;
        btnContainer.appendChild(btnMore)
        btnMore.innerHTML = 'Ver más'
        showResults()
    }else(iters != 0);{
        overwritten()
    }
}    

const runAPI = async () => {
    // Busco en la API el valor de inputText
    let respose = await fetch(`http://api.giphy.com/v1/gifs/search?q=${inputText}&api_key=3573pz5lsjTE2QvU9Ii5g3t7Ky3svfUm&limit=12&offset=${contador}`)

    // Paso los objetos a valor Javascript
    let responseJSON = await respose.json();

    //Subo los objetos al array RESULTS
    results = responseJSON.data
}


// Función para crear los elementos en el HTML y asignarles las URL que obtuve con la API
const showResults = () => {
    for(let x = 0; x <= 11; ++x){
        boxResult = document.createElement("img")
        titleResult = document.createElement("h3")
        creatorResult = document.createElement("h4")
        like = document.createElement("span")
    
        boxResult.appendChild(titleResult)
        boxResult.appendChild(creatorResult)
        boxResult.appendChild(like)

        boxResult.src = results[x].images.preview_webp.url
        titleResult.innerHTML = results[x].title
        creatorResult.innerHTML = results[x].username
        boxResult.className = "touch-element"

        containerResults.appendChild(boxResult)
    }
}


// Función para sobre-escribir las URL que obtuve luego de la 2da, 3era, 4ta busqueda, etc.
const overwritten = () => {
    for(let i = 0; i <= 11; ++i){
        let gif = containerResults.children[i];
        gif.setAttribute('src', `${results[i].images.preview_webp.url}`)
    }  
}







// let elementTouched = document.querySelector(".touch-element");

// elementTouched.addEventListener("onclick", elementSelected)

// const elementSelected = (v) => {
//     let valueElement = v.path.value;
//     console.log(valueElement)
//     console.log("Funcionó")
// }






