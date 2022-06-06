class Game {
    constructor(ctx){

      //Variables del constructor y recolectores de clases
        this.ctx = ctx
        this.interval = null

        this.bg = new Background(ctx)
        this.ball = new Ball(ctx)
        this.player = new Player(ctx)
        this.enemy = new Enemy(ctx)

        this.setListeners();

        this.audio = new Audio('/audio/musicaJuego.mp3')
        this.audio.loop = true

        this.audioLife = new Audio('/audio/ballLost.mp3')
        this.audioGameOver = new Audio('/audio/game-over.mp3')
        this.audioBang = new Audio('/audio/pitido.mp3')

        this.life = 3

        this.count = 0
    }

    //Metodo de inicio del juego
    start() {
        this.audio.play()
        this.interval = setInterval(() => {
            this.clear()
            this.draw()
            this.move()
        }, 1000 / 60)
      }

    //Metodo para pausar el juego
    stop() {
        clearInterval(this.interval)
        this.interval = null
        this.audio.pause()
    }

    //Metodo que limpia toda la pantalla
    clear() {
        this.ctx.clearRect(
          0, 0, this.ctx.canvas.with, this.ctx.canvas.height
        )
    }

    //Metodo que pinta todo el canvas de juego
    draw() {
        this.bg.draw()
        this.ball.draw()
        this.player.draw()
        this.enemy.draw()
        
        this.count++
    }    

    //Metodo que llama a todos los eventos que realizan el movimiento
    move() {
        this.bg.move()
        this.player.move()
        this.ball.move()
        this.collision()
    }

    //Metodo que mira todas las colisiones
    collision(){
      this.colisionCanvasBall()
      this.colisionPlayerBall()
      this.collisionBallRect()
      this.nextLevel()
    }

    //Metodo donde llamamos a los botones y se pasa el evento
    setListeners() {
        document.addEventListener('keydown', (e) => {
          this.player.keyDown(e.keyCode)
        })
        document.addEventListener('keyup', (e) => {
          this.player.keyUp(e.keyCode)
        })
    }

    //Metodo donde se identifica la colision de la bola con el canvas
    colisionCanvasBall(){
      if (this.ball.x + this.ball.r > this.ctx.canvas.width || this.ball.x - this.ball.r < 0) { 
        this.ball.vx = -this.ball.vx
        
      }

      if (this.ball.y - this.ball.r < 0) {
        this.ball.vy = -this.ball.vy
      }

      //Saber si la bola ha tocado fondo
      if(this.ball.y + this.ball.r > this.ctx.canvas.height) {
        if(this.life > 0){
          this.life-- // pierde una vida
          this.audioLife.play()
          this.resetLife();
        } else {
          this.gameOver()
        }
      }
    }

    //Metodo lanza una bola nueva 
    resetLife() {
      this.ball.x = ctx.canvas.width / 2
      this.ball.y = ctx.canvas.height - this.ball.r

      this.ball.vx = 8 * (Math.random() * 2 - 1)
      this.ball.vy = -8
    }

    //Metodo colision pelota y jugador
    colisionPlayerBall() {
      if (this.ball.x < this.player.x + this.player.w && this.ball.x > this.player.x && 
        this.player.y < this.player.y + this.player.h && this.ball.y > this.player.y){

          //Se comprueba donde colisiona la pelota con el jugador
          let colBallOnPlayer = this.ball.x - (this.player.x + this.player.w / 2);
        
          // Se normalizan los valores
          colBallOnPlayer = colBallOnPlayer / (this.player.w / 2);
          
          // Se crea constante con el angulo
          let angle = colBallOnPlayer * Math.PI / 3;
              
          this.ball.vx = this.ball.speed * Math.sin(angle);
          this.ball.vy = -this.ball.speed * Math.cos(angle);
      }
    }

    //Metodo colision bola con el ladrillo/rectangulo superior
    collisionBallRect() {
      for (let n = 0; n < this.enemy.row; n++) {
          for (let m = 0; m < this.enemy.colum; m++) {

            let b = this.enemy.rect [n][m]

            if (b.status) {
                if(this.ball.x + this.ball.r > b.x && 
                  this.ball.x - this.ball.r < b.x + this.enemy.w && 
                  this.ball.y + this.ball.r > b.y && 
                  this.ball.y - this.ball.r < b.y + this.enemy.h) {
                    this.audioBang.play()
                    this.ball.vy = -this.ball.vy
                    b.status = false
                }
            }        
          }
      }
    }
    
    //Metodo para subir de nievl
    nextLevel() {
      let levelDone = true
      
      // Miramos si estan todas los ladrillos con status false
      for (let n = 0; n < this.enemy.row; n++) {
        for (let m = 0; m < this.enemy.colum; m++) {
          levelDone = levelDone && ! this.enemy.rect[n][m].status
        }
      }
      
      if (levelDone) {
        this.enemy.colum++
        this.enemy.createRect()
        this.resetLife()
        this.ball.speed += 2    
      }
    }

    //Metodo para finalizar el juevo
    gameOver() {
        this.stop()
        this.audioGameOver.play()
        document.getElementById("start-btn").style.visibility = "hidden"
        document.getElementById("reload").style.visibility = "visible"
        document.getElementById("game-over").style.visibility = "visible"
    }
}