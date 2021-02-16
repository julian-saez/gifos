/**
 * MENSAJES ANTES DE COMENZAR A GRABAR EL GIF
 */

let video = document.querySelector('video');
let containerCreateGifo = document.getElementById("box")
let containerChild = document.getElementById("text-box")
let recuadroBelow = document.getElementById("recuadro-below")
let processIcons = document.getElementById("process-icons")
let btn = document.getElementById("btn")

video.style.display = 'none'


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


const nextStep = async () => {
    captureCamera()
    function captureCamera(callback) {
        navigator.mediaDevices.getUserMedia({ audio: true, video: true })
            .then(camera => {
                callback(camera);
            })
            .catch(error => {
                console.error(error);
            });
    }

    // ICONO PASO 1
    let passOne = processIcons.children[0]
    let btnStepOne = document.createElement("button")
    recuadroBelow.appendChild(btnStepOne)
    btnStepOne.innerHTML = "CONTINUAR"

    // Le cambio el icono al paso 1
    passOne.setAttribute("src", "assets/paso-a-paso-1-hover.svg")
    btnStepOne.className = "btn"

    btnStepOne.addEventListener("click", function accessAllow() {
        video.style.display = 'flex'
        // Cambio el icono del paso número 2
        let passTwo = processIcons.children[1]
        passTwo.setAttribute("src", "assets/paso-a-paso-2-hover.svg")

        // Borro los textos del medio y el boton de comenzar del recuadro para colocar la vista de la camara encendida
        containerCreateGifo.removeChild(containerChild)
        recuadroBelow.removeChild(btnStepOne)

        let btnStartRecording = document.createElement("button")
        recuadroBelow.appendChild(btnStartRecording)
        btnStartRecording.className = "btn"
        btnStartRecording.innerHTML = "GRABAR"

        // Obtengo la etiqueta video
        let recorder;
        let btnStopRec = document.createElement("button")
        recuadroBelow.appendChild(btnStopRec)
        btnStopRec.style.display = 'none'

        let p = document.createElement("p")
        recuadroBelow.appendChild(p)

        btnStartRecording.addEventListener('click', () => {
            recuadroBelow.removeChild(btnStartRecording)
            btnStartRecording.disabled = true;
            captureCamera(camera => {
                video.muted = true;
                video.volume = 0;
                video.srcObject = camera;

                recorder = RecordRTC(camera, {
                    type: 'video'
                });

                recorder.startRecording();

                recorder.camera = camera;
                btnStopRec.disabled = false;
            })

            btnStopRec.className = "btn"
            btnStopRec.innerHTML = "FINALIZAR"
            btnStopRec.style.display = 'flex'

            video.addEventListener("timeupdate", () => {
                let videoTiming = Math.ceil(video.currentTime);

                if(videoTiming < 1){
                    p.innerHTML = `00:00:00`
                }
                if(videoTiming <= 9){
                    videoTiming = `0${videoTiming}`
                }
                p.innerHTML = `00:00:${videoTiming}`;
            },true)
        }) 

        function stopRecordingCallback() {
            console.log(video)
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
}