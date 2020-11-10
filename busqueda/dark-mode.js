let darkBtn = document.getElementById("mode-btn");

darkBtn.addEventListener("click", function mode(){
    let background = document.getElementById("fondo")
    let backgroundTrending = document.getElementById("trending-gifos")

    if(background.className == "light" && backgroundTrending.className == "light-trending"){
        background.className = "dark";
        backgroundTrending.className = "dark-trending";
    }else{
        background.className = "light";
        backgroundTrending.className = "light-trending";
    }
})
