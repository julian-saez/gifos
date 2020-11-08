/**  ---  CREO LAS CAJAS DONDE ESTARÁN LOS GIFS TRENDING  ---  **/


var arrayTest = ['gifs-test/gif-1.gif', 'gifs-test/gif-2.gif', 'gifs-test/gif-3.gif', 'gifs-test/gif-4.gif', 'gifs-test/gif-5.gif', 'gifs-test/gif-6.gif']

for(let i = 0; i <= 2; ++i){

    var gifBox = document.createElement("img")
    var enlace = document.createElement("a")

    gifBox.appendChild(enlace)

    gifBox.src = arrayTest[i];

    let container = document.getElementById("list-gifs")
    container.appendChild(gifBox)
}


/**  ---   LLAMO LOS BOTONES DEL HTML   ---  **/


let btnBack = document.getElementById("back-btn")
let btnNext = document.getElementById("next-btn")

// btnBack.addEventListener("click", show)
btnNext.addEventListener("click", show)



const show = () => {
    for(let i = 0; i <= 2; ++i){

        var gifBox = document.createElement("img")
        var enlace = document.createElement("a")
    
        gifBox.appendChild(enlace)
    
        gifBox.src = arrayTest[i];
    
        let container = document.getElementById("list-gifs")
        container.appendChild(gifBox)
    }
}