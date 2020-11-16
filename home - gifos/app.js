const urlTrendings = "http://api.giphy.com/v1/gifs/trending?api_key=3573pz5lsjTE2QvU9Ii5g3t7Ky3svfUm&limit=10";
var gifTrendingInfo = [];


fetch(urlTrendings)
.then(res => res.json() )
.then(res => {
res.data.forEach(element => {
    let valores = element;
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

function gifTrending (){
    for(let i = 0; i <= gifTrendingInfo.length; ++i){
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
setTimeout(gifTrending, 1000)








/**
 * FUNCIÓN PARA RECARGAR Y CREAR MÁS GIFS
 */


// const reload = function () {
//     for(let i = 0; i <= 9; ++i){
//         gifBox = document.createElement("img")
//         enlace = document.createElement("a")
//         gifBox.appendChild(enlace)
//         gifBox.id = `gfnumber${idNumber}`;
    
//         let container = document.getElementById("list-gifs")
//         container.appendChild(gifBox)
//     }
// }
