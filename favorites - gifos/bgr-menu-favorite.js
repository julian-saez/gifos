var btnMenu = document.querySelector(".hamburger"),
    menu = document.querySelector(".menu");

btnMenu.addEventListener("click", function desplegar(){
    if(btnMenu.className == "hamburger hamburger--squeeze"){
        btnMenu.className = "hamburger hamburger--squeeze is-active";
        menu.className = "menu";
    }else{
        btnMenu.className = "hamburger hamburger--squeeze";
        menu.className = "menu active";
    }
})