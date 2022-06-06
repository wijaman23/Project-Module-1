
//Se crea canvas
const canvas = document.getElementById("canvas")
const ctx = canvas.getContext("2d")

//Llamada a la clase game
const game = new Game(ctx)

//Reconocimiento del boton en el html
const btn = document.getElementById('start-btn')
const btn2 = document.getElementById('reload')

//Llamada a incio del juego o a la pausa con el boton del html
btn.addEventListener('click', function(){
    if (game.interval){
        game.stop()
        btn.innerText = 'START'
    } else {
        game.start()
        btn.innerText = 'PAUSE'
        document.getElementById("canvas").style.visibility = "visible"
        document.getElementById("scoreboard").style.visibility = "visible"
    }
})
//Llamada para reinciar el juego
btn2.addEventListener('click', function(){
    location.reload()
})
