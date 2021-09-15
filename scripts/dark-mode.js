/*
    ------- RESUMEN -------

    Este programa cambia el tema de la página alterando las clases de cada elemento.
    Las clases ya están definidas en los archivos .scss
    El navegador cuando vuelvas a ingresar a la página recordará el modo que elegiste mediante el localstorage.
*/


const change_mode_btn = document.getElementById("mode-btn")
const body = document.querySelector("body")
const backgroundTrending = document.getElementById("trending-gifos")
const titles = [
    document.querySelector("h1"),
    document.querySelectorAll("h2"),
    document.querySelectorAll("h3"),
    document.querySelectorAll("h4")
]

const nav = document.querySelectorAll(".nav-items")
let icon_facebook = document.getElementById("icon-facebook")
let icon_twitter = document.getElementById("icon-twitter")
let icon_instagram = document.getElementById("icon-instagram")
let moreBtn = document.getElementById("moreBtn")

const utils_dark_theme = [
    {mode: "dark"},
    {mode: "dark-trending"},
    {mode: "dark-text"},
    {text: "Modo Diurno"},
    {socialmedia: "/assets/icon_facebook_noc.svg"},
    {socialmedia: "/assets/icon_twitter_noc.svg"},
    {socialmedia: "/assets/icon_instagram_noc.svg"}
]

const utils_light_theme = [
    {mode: "light"},
    {mode: "light-trending"},
    {mode: "light-text"},
    {text: "Modo Nocturno"},
    {socialmedia: "/assets/icon_facebook.svg"},
    {socialmedia: "/assets/icon-tw-normal.svg"},
    {socialmedia: "/assets/icon_instagram.svg"}
]


change_mode_btn.addEventListener("click", () => {
    if(body.className == "light"){
        body.className = utils_dark_theme[0].mode
        backgroundTrending.className = utils_dark_theme[1].mode

        titles[0].className = utils_dark_theme[2].mode
        titles[1].className = utils_dark_theme[2].mode
        titles[2].className = utils_dark_theme[2].mode
        titles[3].className = utils_dark_theme[2].mode

        change_mode_btn.innerHTML = utils_dark_theme[3].text
        change_mode_btn.className = utils_dark_theme[2].mode
        nav[0].className = `nav-items ${utils_dark_theme[2].mode}`
        nav[1].className = `nav-items ${utils_dark_theme[2].mode}`

        if(moreBtn) moreBtn.className = utils_dark_theme[2].mode

        icon_facebook.src = utils_dark_theme[4].socialmedia
        icon_twitter.src = utils_dark_theme[5].socialmedia
        icon_instagram.src = utils_dark_theme[6].socialmedia

        localStorage.setItem("Mode", JSON.stringify(utils_dark_theme))
        verifyLastTheme()
    }else{
        body.className = utils_light_theme[0].mode
        backgroundTrending.className = utils_light_theme[1].mode

        titles[0].className = utils_light_theme[2].mode  
        titles[1].className = utils_light_theme[2].mode
        titles[2].className = utils_light_theme[2].mode
        titles[3].className = utils_light_theme[2].mode

        change_mode_btn.innerHTML = utils_light_theme[3].text
        change_mode_btn.className = utils_light_theme[2].mode
        nav[0].className = `nav-items ${utils_light_theme[2].mode}`
        nav[1].className = `nav-items ${utils_light_theme[2].mode}`

        if(moreBtn) moreBtn.className = utils_light_theme[2].mode

        icon_facebook.src = utils_light_theme[4].socialmedia
        icon_twitter.src = utils_light_theme[5].socialmedia
        icon_instagram.src = utils_light_theme[6].socialmedia

        localStorage.removeItem("Mode")
        localStorage.setItem("Mode", JSON.stringify(utils_light_theme))
        
        verifyLastTheme()
    }
})

function verifyLastTheme() {
    if(localStorage.getItem("Mode")){
        let data = []
        data = localStorage.getItem("Mode")
        let json = JSON.parse(data)

        body.className = json[0].mode
        backgroundTrending.className = json[1].mode

        titles[1].className = json[2].mode
        titles[2].className = json[2].mode
        titles[3].className = json[2].mode

        change_mode_btn.innerHTML = json[3].text
        change_mode_btn.className = json[2].mode
        nav[0].className = `nav-items ${json[2].mode}`
        nav[1].className = `nav-items ${json[2].mode}`

        if(moreBtn) moreBtn.className = json[2].mode

        icon_facebook.src = json[4].socialmedia
        icon_twitter.src = json[5].socialmedia
        icon_instagram.src = json[6].socialmedia
    }else{
        darkBtn.innerHTML = 'Modo Nocturno'
    }
}

verifyLastTheme()
