const urlTrendings = "http://api.giphy.com/v1/gifs/trending?api_key=3573pz5lsjTE2QvU9Ii5g3t7Ky3svfUm&limit=3";
var array = [];

async function apiRequest(){
    fetch(urlTrendings)
    .then(res => res.json() )
    .then(res => {
    res.data.forEach(element => {
        let valores = element.images.original.url;
        array.push(valores);
    })
    })
    .catch(error => {
        console.log("Error n°", error)
    })
    
    console.log(array)
}

apiRequest()

/**
 * CREO LOS CONTENEDORES DONDE ESTARÁN LOS GIFS
 */

var gifBox;
var title;
var username;
var idNumber = 0;

function loadGifs (){
    for(let i = 0; i <= 2; ++i){
        gifBox = document.createElement("img")
        title = document.createElement("h2")
        username = document.createElement("h3")
        gifBox.appendChild(title)
        gifBox.id = `gfnumber${idNumber}`;
        gifBox.src = array[i];

        var container = document.getElementById("list-gifs")
        container.appendChild(gifBox)
        idNumber = idNumber + 1;
    }
}


setTimeout(loadGifs, 1000)



/**
 * OBTENCIÓN DE LOS DATOS DE LA API
 */



// var contador = 0;

// const saveObject = function (object) {
//     array.push(object)
// }







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
