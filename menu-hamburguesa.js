var btnMenu = document.querySelector(".hamburger")

btnMenu.addEventListener("click", function desplegar(){
    if(btnMenu.className == "hamburger hamburger--squeeze"){
        btnMenu.className = "hamburger hamburger--squeeze is-active";
    }else{
        btnMenu.className = "hamburger hamburger--squeeze";
    }
})