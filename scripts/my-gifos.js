const api_key = '3573pz5lsjTE2QvU9Ii5g3t7Ky3svfUm'
const targets_container = document.querySelector("#targets-container")
let my_gifos = new Array()

const renderMyGifos = () => {
    let items = JSON.parse(localStorage.getItem('MyGifos'))
    items.forEach(el => {
        fetch(`http://api.giphy.com/v1/gifs/${el}?api_key=${api_key}`)
            .then(res => res.json())
            .then(res => {
                let box_content = document.createElement("figure")
                let gif = document.createElement("img")
                let title = document.createElement("figcaption")
                let username = document.createElement("figcaption")
                targets_container.appendChild(box_content)
                box_content.appendChild(gif)
                box_content.appendChild(username)
                box_content.appendChild(title)

                gif.src = res.data.images.original.url
                if(res.data.title){
                    title.innerHTML = res.data.title
                }else{
                    title.innerHTML = "Untitled"
                }
                username.innerHTML = res.data.username
                title.classList = "titles-my-gifos"
                username.classList = "titles-my-gifos"
            })
    });
}


renderMyGifos()