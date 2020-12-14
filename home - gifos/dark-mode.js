/**
 * CODIGO DEL MODO DARK EN HOME - GIFOS
 */

// Llamo el boton del header y los fondos a modificar

let darkBtn = document.getElementById("mode-btn")
let background = document.getElementById("fondo")
let backgroundTrending = document.getElementById("trending-gifos")

// Cambio de color en las fuentes 
let h1 = document.querySelector("h1")
let h3 = document.querySelector("h3")
let h4 = document.querySelector("h4")
let h2 = document.querySelector(".trending").children[0]
// let btnMore = document.getElementById("btn-more-style")

// Almaceno los nombres de las clases

let modeDark = [
    {mode: "dark"},
    {mode: "dark-trending"},
    {mode: "dark-text"}
]

let modeLight = [
    {mode: "light"},
    {mode: "light-trending"},
    {mode: "light-text"}
]


/**
 * PROGRAMA DEL DARK-MODE
 */

// Le asigno un evento al boton de arriba

darkBtn.addEventListener("click", function mode(){
    if(background.className == "light"){
        background.className = modeDark[0].mode
        backgroundTrending.className = modeDark[1].mode
        h1.className = modeDark[2].mode
        h2.className = modeDark[2].mode
        h3.className = modeDark[2].mode
        h4.className = modeDark[2].mode
        // btnMore.className = modeDark[2].mode
        
        // Guardo los valores de arriba en el LocalStorage
        localStorage.setItem("Mode", JSON.stringify(modeDark))
        
    }else{
        background.className = modeLight[0].mode
        backgroundTrending.className = modeLight[1].mode
        h1.className = modeLight[2].mode  
        h2.className = modeLight[2].mode
        h3.className = modeLight[2].mode
        h4.className = modeLight[2].mode
        // btnMore.className = modeLight[2].mode

        // Elimino los valores anteriores para almacenar unos nuevos
        localStorage.removeItem("Mode")
        localStorage.setItem("Mode", JSON.stringify(modeLight))
    }
})



// Obtengo los valores que se hayan almacenado con anterioridad en el LocalStorage

// let valuesSaved = localStorage.getItem("Mode")
// let valuesJS = JSON.parse(valuesSaved)

// Le asigno las clases del LocalStorage ya en objetos javascript

// background.className = valuesJS[0].mode
// backgroundTrending.className = valuesJS[1].mode


// localStorage.removeItem("Mode")

