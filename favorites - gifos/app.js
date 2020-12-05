let containerFavorites = document.getElementById("container-favorites")

let arrayFavorites = []

arrayFavorites.push(JSON.parse(localStorage.getItem("Favorites")))

for(let i = 0;i <= arrayFavorites.length; ++i){
    let gif = document.createElement("img")
    let title = document.createElement("h3")
    let creator = document.createElement("h4")
    let btnDg = document.createElement("button")
    let btnDgImg = document.createElement("img")
    let btnLike = document.createElement("button")
    let likeImg = document.createElement("img")

    gif.appendChild(title)
    gif.appendChild(creator)
    gif.appendChild(btnDg)
    gif.appendChild(btnLike)
    btnDg.appendChild(btnDgImg)
    btnLike.appendChild(likeImg)

    gif.src = arrayFavorites[i].title

    
    containerFavorites.appendChild(gif)
}






const getValue = () => {
    for(let i = 1; i <= amount; ++i){
        
        // Itero hasta llegar al id del gif que clickee.
        let element = document.getElementById(`${i}`)

        // Obtengo el valor del gif (title, url, creator).
        element.addEventListener("click", function clicked() {
            
            let contenedor = document.getElementById("home")
            let url = element.children[0].getAttribute("src")
            let title = this.getElementsByTagName("h3")
            let creator = this.getElementsByTagName("h4")


            // Creo los elementos
            let div = document.createElement("div")
            let divFlex = document.createElement("div")
            let divFlex2 = document.createElement("div")
            let btnExit = document.createElement("button")
            let exitImg = document.createElement("img")
            let bigGif = document.createElement("img")

            
            

            // Declaro los hijos de los elementos
            div.appendChild(divFlex)
            div.appendChild(divFlex2)

            // Boton salir
            divFlex.appendChild(btnExit)
            btnExit.appendChild(exitImg)

            //Gif
            divFlex.appendChild(bigGif)


            // Titulo del gif y creador
            divFlex2.appendChild(titleGif)
            divFlex2.appendChild(creatorGif)

            // Boton like
            divFlex2.appendChild(btnLike)
            btnLike.appendChild(likeImg)

            // Boton descarga
            divFlex2.appendChild(btnDownloading)
            btnDownloading.appendChild(btnDgImg)

            // Le asignó los atributos a los elementos creados 
            divFlex.className = "flex-container"
            divFlex2.className = "flex-container"
            divFlex.id = "flex-1"
            divFlex2.id = "flex-2"
            div.id = "div-container-results"
            bigGif.id = "gif"
            btnExit.id = "btn-exit"
            btnLike.id = "btn-like"
            bigGif.src = url
            exitImg.src = "assets/close.svg"
            btnDownloading.id = "btn-dg"
            btnDgImg.src = "assets/icon-download.svg"
            titleGif.innerHTML = title[0].innerText;
            creatorGif.innerHTML = creator[0].innerText;
            likeImg.src = "assets/icon-fav.svg"


            // Declaro el contenedor donde esta el GIF
            contenedor.appendChild(div)

            // Elimino el div que contiene el gif, el titulo, user, me gusta y descarga
            btnExit.addEventListener("click", async function close(){
                div.remove(bigGif)
            })
            btnLike.addEventListener("click", async function like(){
                likes.push(url, title[0].innerText, creator[0].innerText)
                saveGifs()
            })
        })
    }
}
