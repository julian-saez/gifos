const urlTrendings = "http://api.giphy.com/v1/gifs/trending?api_key=3573pz5lsjTE2QvU9Ii5g3t7Ky3svfUm&limit=3";

/**
 * CREO LOS CONTENEDORES DONDE ESTARÁN LOS GIFS
 */

var gifBox;
var enlace; 
var idNumber = 0;

for(let i = 0; i <= 2; ++i){
    gifBox = document.createElement("img")
    enlace = document.createElement("a")
    gifBox.appendChild(enlace)
    gifBox.id = `gfnumber${idNumber}`;

    let container = document.getElementById("list-gifs")
    container.appendChild(gifBox)
    idNumber = idNumber + 1; 
}

/**
 * FUNCIÓN PARA RECARGAR Y CREAR MÁS GIFS
 */

const reload = function (x) {
    for(let i = 0; i <= 9; ++i){
        gifBox = document.createElement("img")
        enlace = document.createElement("a")
        gifBox.appendChild(enlace)
        gifBox.id = `gfnumber${idNumber}`;
    
        let container = document.getElementById("list-gifs")
        container.appendChild(gifBox)
    }
}


/**
 * OBTENCIÓN DE LOS DATOS DE LA API
 */


 const overWrite = function (x) {
     gifBox.src = x;
 }  


 fetch(urlTrendings)
 .then(res => res.json() )
 .then(res => {
     console.log(res)
     overWrite(res.data[0].images.original.url)
 })

 .catch(error => {
     console.log("Error n°", error)
 })
