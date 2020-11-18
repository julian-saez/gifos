/**
 * COMUNICACIÓN CON LA API
 */

const urlTrendings = "http://api.giphy.com/v1/gifs/trending?api_key=3573pz5lsjTE2QvU9Ii5g3t7Ky3svfUm&limit=10";
var gifTrendingInfo = [];


fetch(urlTrendings)
.then(res => res.json() )
.then(res => {

    // Recorro los objetos del request
    res.data.forEach(element => {   
        let valores = element;

        // Pusheo los objetos al array "gifTrendingInfo"
        gifTrendingInfo.push(valores);
})
})
.catch(error => {
    console.log(error + `Error n° ${status}`)
})

console.log(gifTrendingInfo)


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

// Ejecuto la función para mostrar los 3 gifs trendings
setTimeout(getTrending, 1500)



/**
 * PROGRAMA PARA BUSCAR GIFS
 */


// Varible para ir iterando en el offset y así mostrar nuevas imagenes
var contador = 0;

// Variable para el catch
var noResults = "Lo que buscabas no se ha encontrado"

// Función para tomar el texto del input y buscarlo en la API (Lo declaro antes del input por la asincronia)
function getText (x) {

    // Obtengo SÓLO el TEXTO del input y lo almaceno en esta variable global
    var inputText = x.path[0].value;

    // Busco el texto en la API
    fetch(`http://api.giphy.com/v1/gifs/search?q=${inputText}&api_key=3573pz5lsjTE2QvU9Ii5g3t7Ky3svfUm&limit=20&offset=${contador}`)
    .then(res => res.json()  )
    .then(res => {

        console.log(res)
        // Pusheo los resultados para luego mostrarlos
        var results = [];
        results.push(res)

        for(let x = 0; x <= 19; ++i){
            // Creo los elementos a mostrar
            let boxResult = document.createElement("img");
            let titleResult = document.createElement("h3")
            let like = document.createElement("span")

            boxResult.appendChild(titleResult)
            titleResult.appendChild(like)

            boxResult.src = res[i].images.original.url

            let containerResults = document.getElementById("container-results")
            containerResults.appendChild(boxResult)
        }


        //Itero el contador por si el usuario luego hace click en "Ver más" y le tengo que mostrar nuevos gifs
        contador += 1;
    })
    .catch((error) => {
        console.log(noResults ,error);
    })

}

var input = document.querySelector('input');
input.addEventListener("keyup", getText)



var btnNext = document.getElementById("btn-next")