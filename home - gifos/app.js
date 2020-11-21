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

    console.log(gifTrendingInfo)
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

var boxResult;
var titleResult;
var creatorResult;
var like;
var containerResults = document.getElementById("container-results")

for(let x = 0;x <= 19; x++){
            
    // Creo los elementos a mostrar
    boxResult = document.createElement("img")
    titleResult= document.createElement("h3")
    creatorResult= document.createElement("h4")
    like= document.createElement("span")

    boxResult.appendChild(titleResult)
    titleResult.appendChild(like)
    boxResult.appendChild(creatorResult)
    boxResult.appendChild(like)

    containerResults.appendChild(boxResult)
}


// Evento de la tecla

var input = document.getElementById('buscador')
input.addEventListener("keyup", function enterCode(e){
    var enter = e.which || e.keyCode;

    if(enter === 13){
        input.addEventListener("keyup", getText)
    }else{
    }
})

// Varible para ir iterando en el offset y así mostrar nuevas imagenes
var contador = 0; 

// Guardo los objetos que me da la API en este array
var results = [];

// LLamo al input y a través del evento tomo los valores que escribe el usuario y asocio la función GetText


var inputText;

// Función para tomar el texto del input y buscarlo en la API

async function getText(x) {

    inputText = x.path[0].value;

    // Nombre de lo que se busca

    let searchWord = document.getElementById("search-word")
    searchWord.innerHTML = inputText;

    results = [];

    // Creo la linea que separa los resultados con el subtitulo "Trendings"

    let line = document.getElementById("spacebetween");
    line.className = "line-active";

    let respose = await fetch(`http://api.giphy.com/v1/gifs/search?q=${inputText}&api_key=3573pz5lsjTE2QvU9Ii5g3t7Ky3svfUm&limit=12&offset=${contador}`)
    
    let responseJSON = await respose.json();

    results.push(responseJSON)

    showResults()

    function showResults(){
        for(let x = 0; x <= 19; ++i){
            boxResult.src = results[0].data[x].images.original.url
            titleResult.innerHTML = results[0].data[x].title
            creatorResult.innerHTML = results[0].data[x].username
            // boxResult.id = `${idResult}`
            // idResult += 1
        }
    }
}    

// Variable para iterarle en el id
var idResult = 1;




