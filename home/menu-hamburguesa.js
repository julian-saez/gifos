const hamburguer = document.querySelector(".hamburger")
const menuClass = document.querySelector(".menu")
const menuId = document.getElementById("menu")

hamburguer.addEventListener("click", () => {
    if(hamburguer.className == "hamburger hamburger--squeeze"){
        hamburguer.className = "hamburger hamburger--squeeze is-active";
        menuClass.className = "menu";
        if(innerWidth < 480){
            menuId.style.display = 'block'
            menuId.style.width = '100vw'
            menuId.style.height = '100vh'
        }
    }else{
        hamburguer.className = "hamburger hamburger--squeeze";
        menuClass.className = "menu active";
        if(innerWidth < 480){
            menuId.style.display = 'none'
            menuId.style.width = '0'
            menuId.style.height = '0'
        }
    }
})