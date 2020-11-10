// LLAMO AL BOTON CON EL ID

let darkBtn = document.getElementById("mode-btn");


// LE ASIGNO AL BOTON LA FUNCIÓN QUE DESEO QUE REALICE

darkBtn.addEventListener("click", function mode(){

    // LLAMO LOS ID DE LAS ETIQUETAS PARA CAMBIARLES EL FONDO

    let background = document.getElementById("fondo")
    let backgroundTrending = document.getElementById("trending-gifos")


    // DECLARO EL PROGRAMA

    if(background.className == "light" && backgroundTrending.className == "light-trending"){
        background.className = "dark";
        backgroundTrending.className = "dark-trending";
    }else{
        background.className = "light";
        backgroundTrending.className = "light-trending";
    }


})
