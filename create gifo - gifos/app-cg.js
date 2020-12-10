/**
 * MENSAJES ANTES DE COMENZAR A GRABAR EL GIF
 */


let containerCreateGifo = document.getElementById("box")
let containerChild = document.getElementById("text-box")
let recuadroBelow = document.getElementById("recuadro-below")
let processIcons = document.getElementById("process-icons")
let btn = document.getElementById("btn")


btn.addEventListener("click", function access() {
    // Borro el boton "Comenzar"
    this.remove(btn)

    let h1 = containerChild.children[0]
    let p1 = containerChild.children[1]
    let p2 = containerChild.children[2]

    h1.innerHTML = "¿Nos das acceso a tu camara?"
    p1.innerHTML = "El acceso a tu camara será válido sólo"
    p2.innerHTML = "por el tiempo en el que estés creando el GIFO."

    btnContinue()
})

const btnContinue = () => {
    let passOne = processIcons.children[0]
    let btnContinue = document.createElement("button")
    recuadroBelow.appendChild(btnContinue)


    passOne.setAttribute("src", "assets/paso-a-paso-1-hover.svg")
    btnContinue.className = "btn"
    btnContinue.innerHTML = "CONTINUAR"
    

    btnContinue.addEventListener("click", function accessAllow() {
        containerCreateGifo.removeChild(containerChild)
        let btnGrab = document.createElement("button")
        
        let passTwo = processIcons.children[1]
        passTwo.setAttribute("src", "assets/paso-a-paso-2-hover.svg")
        btnContinue.innerHTML = "GRABAR"

        btnGrab.addEventListener("click", () => {
            btnContinue.innerHTML = "FINALIZAR"
            console.log("Hola")
        })
    })
}
