var darkBtn = document.getElementById("mode-btn")
var background = document.getElementById("fondo")
var backgroundTrending = document.getElementById("trending-gifos")

var modeDark = [
    {mode: "dark"},
    {mode: "dark-trending"},
]

var modeLight = [
    {mode: "light"},
    {mode: "light-trending"}
]

let arrayModes = [];

let valuesSaved = localStorage.getItem("Mode");
let valuesVanillaJs = JSON.parse(valuesSaved);
background.className = valuesVanillaJs[0].mode
backgroundTrending.className = valuesVanillaJs[1].mode

darkBtn.addEventListener("click", function mode(){
    if(background.className == "light" && backgroundTrending.className == "light-trending"){
        background.className = modeDark[0].mode;
        backgroundTrending.className = modeDark[1].mode;
        
        localStorage.setItem("Mode", JSON.stringify(modeDark))
    }else{
        background.className = modeLight[0].mode
        backgroundTrending.className = modeLight[1].mode

        localStorage.removeItem("Mode")
        localStorage.setItem("Mode", JSON.stringify(modeLight))
    }
})




