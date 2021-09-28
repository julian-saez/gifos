/*
    ------- RESUMEN -------

    Este programa cambia el tema de la página alternando las clases de cada elemento.
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
const create_gifo_button = document.querySelector("#create-gifo-button")
let icon_facebook = document.querySelector("#icon-facebook")
let icon_twitter = document.querySelector("#icon-twitter")
let icon_instagram = document.querySelector("#icon-instagram")
let moreBtn = document.querySelector("#moreBtn")

const utils_dark_theme = [
    {mode: "dark"},
    {mode: "dark-trending"},
    {mode: "dark-text"},
    {text: "Modo Diurno"},
    {socialmedia: "../assets/icon_facebook_noc.svg"},
    {socialmedia: "../assets/icon_twitter_noc.svg"},
    {socialmedia: "../assets/icon_instagram_noc.svg"},
    {normal:"../assets/CTA-crear-gifo-modo-noc.svg", hover:"../assets/CTA-crear-gifo-hover-modo-noc.svg"}
]

const utils_light_theme = [
    {mode: "light"},
    {mode: "light-trending"},
    {mode: "light-text"},
    {text: "Modo Nocturno"},
    {socialmedia: "../assets/icon_facebook.svg"},
    {socialmedia: "../assets/icon-tw-normal.svg"},
    {socialmedia: "../assets/icon_instagram.svg"},
    {normal:"../assets/button-crear-gifo.svg", hover:"../assets/CTA-crear-gifo-hover.svg"}
]

change_mode_btn.addEventListener("click", () => {
    if(body.className === "light"){
        body.className = utils_dark_theme[0].mode
        if(backgroundTrending) backgroundTrending.className = utils_dark_theme[1].mode

        if(titles[0]){
            titles[0].className = utils_dark_theme[2].mode
        }
        titles[1].className = utils_dark_theme[2].mode
        titles[2].className = utils_dark_theme[2].mode
        titles[3].className = utils_dark_theme[2].mode

        change_mode_btn.innerHTML = utils_dark_theme[3].text
        change_mode_btn.className = utils_dark_theme[2].mode

        if(innerWidth > 769){
            nav[0].className = `nav-items ${utils_dark_theme[2].mode}`
            nav[1].className = `nav-items ${utils_dark_theme[2].mode}`
        }

        if(moreBtn) moreBtn.className = utils_dark_theme[2].mode

        icon_facebook.src = utils_dark_theme[4].socialmedia
        icon_twitter.src = utils_dark_theme[5].socialmedia
        icon_instagram.src = utils_dark_theme[6].socialmedia

        localStorage.setItem("Mode", JSON.stringify(utils_dark_theme))
        verifyLastTheme()
    }else{
        if(innerWidth > 769){
            change_mode_btn.className = utils_light_theme[2].mode
            nav[0].className = `nav-items ${utils_light_theme[2].mode}`
            nav[1].className = `nav-items ${utils_light_theme[2].mode}`
        }

        body.className = utils_light_theme[0].mode

        if(backgroundTrending) backgroundTrending.className = utils_light_theme[1].mode

        if(titles[0]){
            titles[0].className = utils_light_theme[2].mode  
        }
        titles[1].className = utils_light_theme[2].mode
        titles[2].className = utils_light_theme[2].mode
        titles[3].className = utils_light_theme[2].mode

        change_mode_btn.innerHTML = utils_light_theme[3].text


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
        if(backgroundTrending) backgroundTrending.className = json[1].mode

        if(innerWidth <= 480){
            if(json[1].mode === 'dark-trending'){
                document.querySelector("#menu").style.backgroundColor = "#000000"
            }else{
                document.querySelector("#menu").style.backgroundColor = "#6742E7"
            }
        }

        if(titles[0]){
            titles[0].className = json[2].mode
        }
        titles[1].className = json[2].mode
        titles[2].className = json[2].mode
        titles[3].className = json[2].mode

        change_mode_btn.innerHTML = json[3].text

        if(nav[0]){
            if(json[2].mode !== 'light-text'){
                change_mode_btn.className = json[2].mode
                nav[0].className = `nav-items ${json[2].mode}`
                nav[1].className = `nav-items ${json[2].mode}`
            }
        }

        if(moreBtn) moreBtn.className = json[2].mode

        icon_facebook.src = json[4].socialmedia
        icon_twitter.src = json[5].socialmedia
        icon_instagram.src = json[6].socialmedia

        if(create_gifo_button){
            create_gifo_button.src = json[7].normal
            create_gifo_button.addEventListener("mouseover", () => {
                create_gifo_button.src = json[7].hover
            })
            create_gifo_button.addEventListener("mouseout", () => {
                create_gifo_button.src = json[7].normal
            })
        }
    }else{
        darkBtn.innerHTML = 'Modo Nocturno'
    }
}

verifyLastTheme()
