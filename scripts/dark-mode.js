/**
 * CODIGO DEL MODO DARK EN HOME - GIFOS
 */

// Llamo el boton del header, nav, iconos y los fondos a modificar
let darkBtn = document.getElementById("mode-btn")
let background = document.getElementById("background-body")
let backgroundTrending = document.getElementById("trending-gifos")
let h1 = document.querySelector("h1")
let h3 = document.querySelector("h3")
let h4 = document.querySelector("h4")
let h2 = document.querySelector("#trending").children[0]
let nav1 = document.getElementById("nav1")
let nav2 = document.getElementById("nav2")
let iconFacebook = document.getElementById("icon-facebook")
let iconTwitter = document.getElementById("icon-twitter")
let iconInstagram = document.getElementById("icon-instagram")
let moreBtn = document.getElementById("moreBtn")

// Nombres de las clases
let modeDark = [
    {mode: "dark"},
    {mode: "dark-trending"},
    {mode: "dark-text"},
    {text: "Modo Diurno"},
    {socialmedia: "/assets/icon_facebook_noc.svg"},
    {socialmedia: "/assets/icon_twitter_noc.svg"},
    {socialmedia: "/assets/icon_instagram_noc.svg"}
]

let modeLight = [
    {mode: "light"},
    {mode: "light-trending"},
    {mode: "light-text"},
    {text: "Modo Nocturno"},
    {socialmedia: "/assets/icon_facebook.svg"},
    {socialmedia: "/assets/icon-tw-normal.svg"},
    {socialmedia: "/assets/icon_instagram.svg"}
]


/**
 * PROGRAMA DEL DARK-MODE
 */

// Le asigno un evento al boton de arriba

darkBtn.addEventListener("click", function mode(){
    if(background.className == "light"){
        // Backgrounds
        background.className = modeDark[0].mode
        backgroundTrending.className = modeDark[1].mode

        // Titulos
        h1.className = modeDark[2].mode
        h2.className = modeDark[2].mode
        h3.className = modeDark[2].mode
        h4.className = modeDark[2].mode

        // Nav
        darkBtn.innerHTML = modeDark[3].text
        darkBtn.className = modeDark[2].mode
        nav1.className = modeDark[2].mode
        nav2.className = modeDark[2].mode

        // Botones
        moreBtn.className = modeDark[2].mode

        // Cambio los iconos
        iconFacebook.src = modeDark[4].socialmedia
        iconTwitter.src = modeDark[5].socialmedia
        iconInstagram.src = modeDark[6].socialmedia

        // Guardo los valores de arriba en el LocalStorage
        localStorage.setItem("Mode", JSON.stringify(modeDark))

        // Ejecuto la función para que se aplique
        check()
        
    }else{
        // Backgrounds
        background.className = modeLight[0].mode
        backgroundTrending.className = modeLight[1].mode

        // Titulos
        h1.className = modeLight[2].mode  
        h2.className = modeLight[2].mode
        h3.className = modeLight[2].mode
        h4.className = modeLight[2].mode

        // Nav
        darkBtn.innerHTML = modeLight[3].text
        darkBtn.className = modeLight[2].mode
        nav1.className = modeLight[2].mode
        nav2.className = modeLight[2].mode

        // Botones
        moreBtn.className = modeLight[2].mode

        // Cambio los iconos
        iconFacebook.src = modeLight[4].socialmedia
        iconTwitter.src = modeLight[5].socialmedia
        iconInstagram.src = modeLight[6].socialmedia

        // Elimino los valores anteriores para almacenar unos nuevos
        localStorage.removeItem("Mode")

        // Almaceno las nuevas clases
        localStorage.setItem("Mode", JSON.stringify(modeLight))
        
        // Compruebo el cambio
        check()
    }
})

function check() {
    if(localStorage.getItem("Mode")){
    // Obtengo los valores que se hayan almacenado con anterioridad en el LocalStorage  
    let valuesSaved = []
    valuesSaved = localStorage.getItem("Mode")
    let valuesJS = JSON.parse(valuesSaved)

    // Le asigno las clases del LocalStorage ya en objetos javascript
    background.className = valuesJS[0].mode
    backgroundTrending.className = valuesJS[1].mode

    // Color de los titulos y subtitulos
    h1.className = valuesJS[2].mode  
    h2.className = valuesJS[2].mode
    h3.className = valuesJS[2].mode
    h4.className = valuesJS[2].mode

    // Navegación y boton
    darkBtn.innerHTML = valuesJS[3].text
    darkBtn.className = valuesJS[2].mode
    nav1.className = valuesJS[2].mode
    nav2.className = valuesJS[2].mode

    // Botones
    if(moreBtn){
        moreBtn.className = valuesJS[2].mode
    }

    // Iconos
    iconFacebook.src = valuesJS[4].socialmedia
    iconTwitter.src = valuesJS[5].socialmedia
    iconInstagram.src = valuesJS[6].socialmedia
    }else{
        darkBtn.innerHTML = 'Modo Nocturno'
    }
}

check()


