/**
 * CREO LOS CONTENEDORES DONDE ESTARÁN LOS GIFS
 */


for(let i = 0; i <= 2; ++i){
    var gifBox = document.createElement("img")
    var enlace = document.createElement("a")
    gifBox.appendChild(enlace)

    let container = document.getElementById("list-gifs")
    container.appendChild(gifBox)
}


/**
 * COMUNICACIÓN CON LAS API'S
 */

const url = "http://giphy.bintray.com/giphy-sdk";

// Función para plasmar los gifs

const getGif = (image) => {
    gifBox.getAttribute('src', image)
}


// fetch(url)
// .then(response => response.json())
// .then(binaryLargeObject => {
//     const domString = URL.createObjectURL(binaryLargeObject);
//     getGif(domString)
// })

fetch(url)
.then(response => response.json())
.then(data => {
    debugger
    getGif(data.image)
})

/**  ---   LLAMO LOS BOTONES DEL HTML   ---  **/


// let btnBack = document.getElementById("back-btn")
// let btnNext = document.getElementById("next-btn")

// // btnBack.addEventListener("click", show)
// btnNext.addEventListener("click", show)



// const show = () => {
//     for(let i = 0; i <= 2; ++i){

//         var gifBox = document.createElement("img")
//         var enlace = document.createElement("a")
    
//         gifBox.appendChild(enlace)
    
//         gifBox.src = arrayTest[i];
    
//         let container = document.getElementById("list-gifs")
//         container.appendChild(gifBox)
//     }
// }
