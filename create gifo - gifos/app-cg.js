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

    nextStep()
})

const nextStep = () => {
    // ICONO PASO 1
    let passOne = processIcons.children[0]
    let btnStepOne = document.createElement("button")
    recuadroBelow.appendChild(btnStepOne)


    btnStepOne.innerHTML = "CONTINUAR"

    // Le cambio el icono al paso 1
    passOne.setAttribute("src", "assets/paso-a-paso-1-hover.svg")
    btnStepOne.className = "btn"

    btnStepOne.addEventListener("click", function accessAllow() {

        // Borro los textos del medio del recuadro para colocar la vista de la camara encendida
        containerCreateGifo.removeChild(containerChild)

        // Borro el boton anterior
        recuadroBelow.removeChild(btnStepOne)

        // Boton nuevo para asignarle una nueva funcionalidad
        let btnStart = document.createElement("button")
        recuadroBelow.appendChild(btnStart)
        btnStart.className = "btn"
        btnStart.innerHTML = "GRABAR"

        // Tiempo de grabación
        let timing = document.createElement("p")
        // timing.innerHTML

        // Cambio el icono del paso número 2
        let passTwo = processIcons.children[1]
        passTwo.setAttribute("src", "assets/paso-a-paso-2-hover.svg")

        btnStart.addEventListener("click", async () => {

            // Obtengo la etiqueta video
            let video = document.querySelector('video');
            let recorder;

            // Borro el boton anterior para que no me vuelta a registrar el nuevo evento
            recuadroBelow.removeChild(btnStart)

            let btnStartRecording = document.createElement("button")
            recuadroBelow.appendChild(btnStartRecording)
            btnStartRecording.className = "btn"
            btnStartRecording.innerHTML = "GRABAR"

            let btnStopRec = document.createElement("button")
            recuadroBelow.appendChild(btnStopRec)
            btnStopRec.className = "btn"
            btnStopRec.innerHTML = "FINALIZAR"


            captureCamera()

            function captureCamera(callback) {
                navigator.mediaDevices.getUserMedia({ audio: true, video: true })
                    .then(camera => {
                        callback(camera);
                    })

                    .catch(error => {
                        alert('Unable to capture your camera. Please check console logs.');
                        console.error(error);
                    });
            }

            btnStartRecording.addEventListener('click', function recording(){
                btnStart.disabled = true;
                captureCamera(camera => {
                    video.muted = true;
                    video.volume = 0;
                    video.srcObject = camera;

                    recorder = RecordRTC(camera, {
                        type: 'video'
                    });

                    recorder.startRecording();

                    // release camera on stopRecording
                    recorder.camera = camera;

                    btnStopRec.disabled = false;
                })
            }) 

            function stopRecordingCallback() {
                video.src = video.srcObject = null;
                video.muted = false;
                video.volume = 1;
                video.src = URL.createObjectURL(recorder.getBlob());
                
                recorder.camera.stop();
                recorder.destroy();
                recorder = null;
            }


            btnStopRec.addEventListener('click', () => {
                btnStopRec.disabled = true;
                recorder.stopRecording(stopRecordingCallback);
            })
        })
    })
}
