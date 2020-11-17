var inputValue = document.getElementById("buscador").value;

var tecla = document.getElementById("buscador").addEventListener("onclick", function searching(){
    fetch(`http://api.giphy.com/api.giphy.com/v1/gifs/search?api_key=3573pz5lsjTE2QvU9Ii5g3t7Ky3svfUm=${inputValue}&limit=15&offset=0`)
    .then(res => res.json() )
    .then(res => {
        console.log(res)
    })
    .catch(error => {
        console.log("no funciona kpo")
    })
})

// let tecla = (document.getElementById("buscador")) ;


