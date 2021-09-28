const api_key = '3573pz5lsjTE2QvU9Ii5g3t7Ky3svfUm'
const targets_container = document.querySelector("#targets-container")
const iconMyGifos = document.querySelector("#icon-my-gifos").src = "../assets/icon-mis-gifos.svg"
let my_gifos = new Array()
let url_my_gifos = []


const removeItem = el => {
    my_gifos.splice(my_gifos.indexOf(indexed[el]), 1)
    localStorage.setItem('Favorites', JSON.stringify(my_gifos))
}

const downloadMyGifo = async index => {
    let a = document.createElement('a');
    let response = await fetch(url_my_gifos[index]);
    let file = await response.blob();
    a.download = Math.floor(Math.round(Math.random() * 1998888)); 
    a.href = window.URL.createObjectURL(file);
    a.dataset.downloadurl = ['application/octet-stream', a.download, a.href].join(':');
    a.click();
}

const renderMyGifos = () => {
    my_gifos = JSON.parse(localStorage.getItem('MyGifos'))
    if(my_gifos && my_gifos.length >= 1){
        my_gifos.forEach(el => {
            fetch(`http://api.giphy.com/v1/gifs/${el}?api_key=${api_key}`)
                .then(res => res.json())
                .then(res => {
                    url_my_gifos = [...url_my_gifos, res.data.images.original.mp4]
    
                    let box_content = document.createElement("figure")
                    let box_content_titles = document.createElement("div")
                    let gif = document.createElement("img")
                    let title = document.createElement("figcaption")
                    let username = document.createElement("figcaption")
                    let layout = document.createElement("div")
                    let buttons_container = document.createElement("div")
                    let btn_delete = document.createElement("button")
                    let btn_download = document.createElement("button")
                    let btn_max = document.createElement("button")
                    let delete_icon = document.createElement("img")
                    let download_icon = document.createElement("img")
                    let max_icon = document.createElement("img")
                    targets_container.appendChild(box_content)
                    box_content.appendChild(gif)
                    box_content.appendChild(username)
                    box_content.appendChild(title)
                    box_content.appendChild(layout)

    
                    box_content_titles.id = "box-content-titles"
                    gif.classList = "gif-element"
                    layout.classList = "layout-my-gifos"
                    layout.style.display = "none"
                    title.style.display = "none"
                    username.style.display = "none"
                    buttons_container.style.display = "none"
    
                    box_content.addEventListener("mouseover", () => {
                        layout.style.display = "block"
                        title.style.display = "block"
                        username.style.display = "block"
                        buttons_container.style.display = "block"
                    })
    
                    box_content.addEventListener("mouseout", () => {
                        layout.style.display = "none"
                        title.style.display = "none"
                        username.style.display = "none"
                        buttons_container.style.display = "none"
                    })
    
                    box_content.appendChild(buttons_container)
                    buttons_container.appendChild(btn_delete)
                    buttons_container.appendChild(btn_download)
                    buttons_container.appendChild(btn_max)
                    buttons_container.classList = "buttons-my-gifo"
                    btn_max.classList = "buttons_my_gifo_target"
                    btn_delete.classList = "buttons_my_gifo_target"
                    btn_download.classList = "buttons_my_gifo_target"
                    btn_delete.appendChild(delete_icon)
                    btn_download.appendChild(download_icon)
                    btn_max.appendChild(max_icon)
                    delete_icon.src = "../assets/icon-trash-normal.svg"
                    btn_delete.addEventListener("mouseover", () => {    
                        delete_icon.src = "../assets/icon-trash-hover.svg"
                    })
                    btn_delete.addEventListener("mouseout", () => {
                        delete_icon.src = "../assets/icon-trash-normal.svg"
                    })
                    btn_delete.addEventListener("click", () => {
                        my_gifos.splice(my_gifos.indexOf(el), 1)
                        localStorage.setItem('MyGifos', JSON.stringify(my_gifos))
                        document.location.reload();
                    })
                    download_icon.src = "../assets/icon-download.svg"
                    btn_download.addEventListener("mouseover", () => {
                        download_icon.src = "../assets/icon-download-hover.svg"
                    })
                    btn_download.addEventListener("mouseout", () => {
                        download_icon.src = "../assets/icon-download.svg"
                    })
                    btn_download.addEventListener("click", () => {
                        downloadMyGifo(my_gifos.indexOf(el))
                    })
                    btn_max.addEventListener("mouseover", () => {
                        max_icon.src = "../assets/icon-max-hover.svg"
                    })
                    btn_max.addEventListener("mouseout", () => {
                        max_icon.src = "../assets/icon-max-normal.svg"
                    })
    
                    btn_max.addEventListener("click", () => {
                        // Parents
                        let max_container = document.querySelector("#max-gifo")
                        let max_child = document.createElement("figure")
                        let column_max = document.createElement("div")
                        let below_max_container = document.createElement("div")
                        let titles_max_container = document.createElement("div")

                        max_container.appendChild(max_child)
                        max_child.appendChild(column_max)
                        column_max.appendChild(below_max_container)
                        below_max_container.appendChild(titles_max_container)
                        
                        below_max_container.id = "below-max-container"
                        column_max.style.display = "flex"
                        column_max.id = "column-max"
                        
                        // Child elements
                        let gif_max = document.createElement("img")
                        gif_max.id = "gif-max"
                        let gif_max_title = document.createElement("figcaption")
                        let gif_max_username = document.createElement("figcaption")
                        let btn_exit = document.createElement("button")
                        let icon_delete = document.createElement("img")
                        let buttons_content_max = document.createElement("div")
                        let btn_download_max = document.createElement("button")
                        let btn_trash_max = document.createElement("button")
                        let icon_download_max = document.createElement("img")
                        let icon_trash_max = document.createElement("img")
                        
                        column_max.appendChild(gif_max)
                        column_max.appendChild(below_max_container)
                        titles_max_container.appendChild(gif_max_username)
                        titles_max_container.appendChild(gif_max_title)
                        max_child.appendChild(btn_exit)
                        btn_exit.appendChild(icon_delete)
                        below_max_container.appendChild(buttons_content_max)
                        buttons_content_max.id = "buttons-content-max"
                        buttons_content_max.appendChild(btn_trash_max)
                        btn_trash_max.appendChild(icon_trash_max)
                        icon_trash_max.src = "../assets/icon-trash-normal.svg"
                        buttons_content_max.appendChild(btn_download_max)
                        btn_download_max.appendChild(icon_download_max)
                        icon_download_max.src = "../assets/icon-download.svg"
    
                        gif_max.src = res.data.images.original.url
                        btn_exit.id = "btn-exit"
                        max_child.id = "max-gifo-child"
                        gif_max_username.innerHTML = res.data.username
                        if(res.data.title){
                            gif_max_title.innerHTML = res.data.username
                        }else{
                            gif_max_title.innerHTML = "my untitled gifo"
                        }
                        
                        max_container.style.display = "flex"
                        max_child.id = "gifo-max-child"
                        max_child.classList = "flex-container"
                        icon_delete.src = "../assets/close.svg"
    
                        btn_exit.addEventListener("click", () => {
                            max_container.style.display = "none"
                            max_container.removeChild(max_child)
                        })

                        btn_trash_max.addEventListener("click", () => {
                            my_gifos.splice(my_gifos.indexOf(el), 1)
                            localStorage.setItem('MyGifos', JSON.stringify(my_gifos))
                            document.location.reload();
                        })

                        btn_download_max.addEventListener("click", () => {
                            downloadMyGifo(my_gifos.indexOf(el))
                        })
                    })
                    max_icon.src = "../assets/icon-max-normal.svg"
    
                    gif.src = res.data.images.original.url
                    if(res.data.title){
                        title.innerHTML = res.data.title
                    }else{
                        title.innerHTML = "my untitled gifo"
                    }
                    username.innerHTML = res.data.username
                    title.classList = "titles-my-gifos"
                    username.classList = "titles-my-gifos"
                })
        });
    }else{
        document.querySelector("#my-gifos-no-content").style.display = "flex"
    }
}

renderMyGifos()