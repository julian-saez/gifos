const api_key = '3573pz5lsjTE2QvU9Ii5g3t7Ky3svfUm'
const video = document.querySelector('video')
const video_message = document.getElementById("video-message")
const btn_start = document.getElementById("btn-start")
const circles = document.getElementById("steps-circles")
const camera_titles = document.getElementById("camera-titles")
const btn_recording = document.getElementById("btn-recording")
const btn_finish = document.getElementById("btn-finish")
const btn_upload = document.getElementById("btn-upload")
const btn_download = document.getElementById("btn-download")
const btn_link = document.getElementById("btn-link")
const loader = document.getElementById("icon-loader")
const gif_preview = document.getElementById("gif-preview")
const video_lentgh = document.getElementById("video-lentgh")
const btn_repeat_video = document.getElementById("repeat-video")
const url_to_copy = document.getElementById("url-copy")
let recorder;
let stream = null
let my_gifo_url;

const getAccess = async () => {
    try{
        stream = await navigator.mediaDevices.getUserMedia({audio:false,video:{height: { max: 480 }}})
        btn_recording.style.display = "block"
        btn_recording.innerHTML = "GRABAR"
        circles.children[1].style.background = "#6742E7"
        circles.children[1].style.color = "#ffffff"
        circles.children[0].style.background = "transparent"
        circles.children[0].style.color = "#6742E7"
        camera_titles.style.display = "none"
        video.style.display = "block"

    }catch(err) {
        console.error(err)
    }
}

const copyElement = value => {
    var aux = document.createElement("input");
    aux.setAttribute("value", value);
    document.body.appendChild(aux);
    aux.select();
    document.execCommand("copy");
    document.body.removeChild(aux);
}

const stopRecorder = () => {
    video.src = video.srcObject = null;
    video.muted = false;
    video.volume = 1;
    btn_repeat_video.style.display = "block"
    video_lentgh.style.display = "none"

    let blob = recorder.getBlob();  
    
    form = new FormData();
    form.append('file', blob, 'my-gif.gif');
    stream.stop();

    recorder.destroy();
    recorder = null;

    btn_repeat_video.addEventListener("click", () => {
        gif_preview.src = window.URL.createObjectURL(blob);
        video.style.display = "none"
        gif_preview.style.display = "block"
        btn_repeat_video.style.display = "none"
    })
}

const getMyGifo = id => {
    fetch(`http://api.giphy.com/v1/gifs/${id}?api_key=${api_key}`)
        .then(res =>  res.json())
        .then(res => {
            my_gifo_url = res.data.images.original.mp4
        })
        .catch(err => {
            console.error(err)
        })
}

const downloadMyGifo = async url => {
    let a = document.createElement('a');
    let response = await fetch(url);
    let file = await response.blob();
    a.download = Math.floor(Math.round(Math.random() * 1998888)); 
    a.href = window.URL.createObjectURL(file);
    a.dataset.downloadurl = ['application/octet-stream', a.download, a.href].join(':');
    a.click();
}

const saveMyGifos = id => {
    let collection = new Array()
    collection.push(id)
    if(localStorage.getItem('MyGifos')){
        let items = JSON.parse(localStorage.getItem('MyGifos'))
        items.forEach(el => {
            collection.push(el)
        })
        localStorage.setItem('MyGifos', JSON.stringify(collection))
    }else{
        localStorage.setItem('MyGifos', JSON.stringify(collection))
    }
}

btn_start.addEventListener("click", async () => {
    circles.children[0].style.background = "#6742E7"
    circles.children[0].style.color = "#ffffff"
    btn_start.style.display = "none"

    camera_titles.children[0].innerHTML = "¿Nos das acceso a tu camara?"
    camera_titles.children[1].innerHTML = "El acceso a tu camara será válido sólo"
    camera_titles.children[2].innerHTML = "por el tiempo en el que estés creando el GIFO."
    getAccess()
})

let recording = false
btn_recording.addEventListener("click", () => {
    btn_recording.style.display = "none"
    btn_finish.style.display = "block"
    video.muted = true;
    video.volume = 0;
    video.srcObject = stream
    video.play();
    recorder = RecordRTC(stream, {
        type: 'gif',
        frameRate: 1,
        quality: 10,
        width: 360,
        hidden: 240
    });
    recorder.startRecording()
    let seconds = 0
    recording = true
    setInterval(() => {
        if(recording){
            seconds += 1
            if(seconds <= 9){
                video_lentgh.innerHTML = `00:00:0${seconds}`
            }else{
                // Limit reached
                btn_finish.style.display = "none"
                btn_upload.style.display = "flex"
                recorder.stopRecording(stopRecorder)
                recording = false
            }
        }
    }, 1000)
})

btn_finish.addEventListener("click", () => {
    recording = false
    btn_finish.style.display = "none"
    btn_upload.style.display = "flex"
    recorder.stopRecording(stopRecorder)
})

btn_upload.addEventListener('click', () => {
    btn_upload.style.display = "none"
    loader.style.display = "flex"
    fetch("https://upload.giphy.com/v1/gifs?api_key=3573pz5lsjTE2QvU9Ii5g3t7Ky3svfUm", 
    {
        method: 'POST',
        body: form
    })
    .then(res => res.json())
    .then(res => {
        loader.style.display = "none"
        video_message.style.display = "flex"
        circles.children[1].style.background = "transparent"
        circles.children[1].style.color = "#6742E7"
        circles.children[2].style.background = "#6742E7"
        circles.children[2].style.color = "#ffffff"
        getMyGifo(res.data.id)
        saveMyGifos(res.data.id)
    })
    .catch(err => {
        console.log(err);
    })
})

btn_download.addEventListener("mouseover", () => {
    document.getElementById("icon-download").src = "../assets/icon-download-hover.svg"
})

btn_download.addEventListener("mouseout", () => {
    document.getElementById("icon-download").src = "../assets/icon-download.svg"
})

btn_download.addEventListener("click", () => {
    downloadMyGifo(my_gifo_url)
})

btn_link.addEventListener("mouseover", () => {
    document.getElementById("icon-link").src = "../assets/icon-link-hover.svg"
})

btn_link.addEventListener("mouseout", () => {
    document.getElementById("icon-link").src = "../assets/icon-link-normal.svg"
})

btn_link.addEventListener("click", async () => {
    copyElement(my_gifo_url)
})






