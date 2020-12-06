/**
 * CODIGO DEL MODO DARK EN HOME - GIFOS
 */

// Llamo el boton del header y los fondos a modificar

var darkBtn = document.getElementById("mode-btn")
var background = document.getElementById("fondo")
var backgroundMakingGif = document.getElementById("making-gifo-container")


// Almaceno los nombres de las clases

var modeDark = [
    {mode: "dark"},
    {mode: "dark-making-container"}
]

var modeLight = [
    {mode: "light"},
    {mode: "light-making-container"}
]


/**
 * PROGRAMA DEL DARK-MODE
 */

// Le asigno un evento al boton de arriba

darkBtn.addEventListener("click", function mode(){
    if(background.className == "light" && backgroundMakingGif.className == "light-making-container"){
        background.className = modeDark[0].mode
        backgroundMakingGif.className = modeDark[1].mode
        
        // Guardo los valores de arriba en el LocalStorage
        localStorage.setItem("Mode", JSON.stringify(modeDark))
        
    }else{
        background.className = modeLight[0].mode
        backgroundMakingGif.className = modeLight[1].mode  

        // Elimino los valores anteriores para almacenar unos nuevos
        localStorage.removeItem("Mode")
        localStorage.setItem("Mode", JSON.stringify(modeLight))
    }
})



// Obtengo los valores que se hayan almacenado con anterioridad en el LocalStorage

let valuesSaved = localStorage.getItem("Mode")
let valuesJS = JSON.parse(valuesSaved)

// Le asigno las clases del LocalStorage ya en objetos javascript

background.className = valuesJS[0].mode
backgroundMakingGif.className = valuesJS[1].mode