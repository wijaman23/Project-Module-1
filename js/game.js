class Game {
    constructor(ctx){

      //Variables del constructor y recolectores de clases
        this.ctx = ctx
        this.interval = null

        this.bg = new Background(ctx)
        this.ball = new Ball(ctx)
        this.player = new Player(ctx)
        this.bricks = new Bricks(ctx)
        this.gift = new Gift(ctx)

        this.setListeners();

        this.audio = new Audio('/audio/musicaJuego.mp3')
        this.audio.loop = true
        this.audioLife = new Audio('/audio/ballLost.mp3')
        this.audioGameOver = new Audio('/audio/game-over.mp3')
        this.audioBang = new Audio('/audio/pitido.mp3')
        this.audioWin = new Audio('/audio/winGame2.mp3')
        

        //Panel a la derecha del canvas donde se refleja los marcadores
        this.btnLive = document.getElementById('scoreboard-live')
        this.btnScore = document.getElementById('scoreboard-score')
        this.btnRounnd = document.getElementById('scoreboard-round')

        this.score = 0
        this.life = 3
        this.round = 1
    }

    //Metodo de inicio del juego
    start() {
        this.audio.play()
        this.interval = setInterval(() => {
            this.clear()
            this.draw()
            this.move()
            this.collide()
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
        this.bricks.draw()
        if ((this.score === 100) && this.ctx.canvas.height > this.gift.y) {
          this.gift.draw("good")
            if(this.ctx.canvas.height < (this.gift.y + 10)){
              this.gift.y = -100
              this.gift.vy = 0
            }
        } else if (this.score === 300 && this.ctx.canvas.height > this.gift.y){
          this.gift.draw("bad") 
            if(this.ctx.canvas.height < (this.gift.y + 10)){
                this.gift.y = -1000
            }   
        }
    }    

    //Metodo que llama a todos los eventos que realizan el movimiento
    move() {
        this.bg.move()
        this.player.move()
        this.ball.move()
        if (this.score === 100){
          this.gift.move()
        } else if (this.score === 300) {
          this.gift.vy = 9
          this.gift.move()
        } 
    }

    //Metodo que mira todas las colisiones
    collide() {
      this.collisionCanvasBall()
      this.collisionPlayerBall()
      this.collisionBallBricks()
      this.collisionGiftBricks()
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
    collisionCanvasBall(){
      //Colisiones de la bola con el canvas
      this.ball.collisionBall()

      //Saber si la bola ha tocado fondo
      if(this.ball.y + this.ball.r > this.ctx.canvas.height) {
        if(this.life > 1){  
          this.life-- 
          this.audioLife.play()
          this.ball.resetBall()
          this.btnLive.innerText = this.life
          this.player.w = 150
        } else {
          this.gameOver()
        }
      }
    }

    //Metodo colision pelota y jugador
    collisionPlayerBall() {
      if (this.ball.collideWith(this.player)){

          //Se comprueba donde colisiona la pelota con el jugador
          let colBallOnPlayer = this.ball.x - (this.player.x + this.player.w / 2)
        
          // Se normalizan los valores
          colBallOnPlayer = colBallOnPlayer / (this.player.w / 2)
          
          // Se crea constante con el angulo
          let angle = colBallOnPlayer * Math.PI / 3
              
          this.ball.vx = this.ball.speed * Math.sin(angle)
          this.ball.vy = -this.ball.speed * Math.cos(angle)
      }
    }

    //Metodo colision bola con el ladrillo/rectangulo superior
    collisionBallBricks() {
      for (let n = 0; n < this.bricks.colum; n++) {
          for (let m = 0; m < this.bricks.row; m++) {

            let b = this.bricks.brick [n][m]

            //Verifico que si esta en true el estado entra en el if
            if (b.status) {
                if(this.ball.x + this.ball.r > b.x && 
                  this.ball.x - this.ball.r < b.x + this.bricks.w && 
                  this.ball.y + this.ball.r > b.y && 
                  this.ball.y - this.ball.r < b.y + this.bricks.h) {
                    this.audioBang.play()
                    this.ball.vy = -this.ball.vy
                    b.status = false
                    this.score+=100
                    this.btnScore.innerText = this.score
                }
            }        
          }
      }
    }

    //Metodo colision premio con player
    collisionGiftBricks() {
      if (this.player.collideWith(this.gift) && this.score === 100) {
          this.player.w = 200
      } else if (this.player.collideWith(this.gift) && this.score === 300) {
          this.player.w = 100
      }
    }

    //Metodo para subir de nievl
    nextLevel() {
      let levelDone = true
      
      // Miramos si estan todas los ladrillos con status false
      for (let n = 0; n < this.bricks.colum; n++) {
        for (let m = 0; m < this.bricks.row; m++) {
          levelDone = levelDone && ! this.bricks.brick[n][m].status
        }
      }

      //Si se pasa de nivel se dibuja nuevos ladrillos y lanzo una pelota desde 0
      if (levelDone) {
        this.bricks.row++
        this.bricks.createBrick()
        this.ball.resetBall()
        //Se aumenta el nivel de velocidad cuando toque la pala
        this.ball.speed += 2   
        //Se aumenta de ronda en uno y se inserta en el canvas
        this.round+=1

        if (this.round === 4) {
          this.btnRounnd.innerText = 'Last rival'
        } else if (this.round === 5) {
          this.btnRounnd.innerText = 'CAMPEON'
        } else {
          this.btnRounnd.innerText = this.round + ' / 4'
        }

      } 
      //Cuando se pase el ultimo nivel se ejecuta la parada del juego y se inicia la musica de ganador
      if (this.round === 5) {
        this.stop()
        document.getElementById("win-game").style.visibility = "visible"
        this.audioWin.play()
        document.getElementById("reload").style.visibility = "visible"
        document.getElementById("start-btn").style.visibility = "hidden"
      }

      //Dibujar los escudos de cada nivel
      switch (this.round) {
        case 2:
          document.getElementById("shieldRYO").style.visibility = "visible"
          document.getElementById("shieldLGN").style.visibility = "hidden"
          break;

        case 3:
          document.getElementById("shieldGTF").style.visibility = "visible"
          document.getElementById("shieldRYO").style.visibility = "hidden"
          break;

        case 4:
          document.getElementById("shieldATM").style.visibility = "visible"
          document.getElementById("shieldGTF").style.visibility = "hidden"
          break;

        case 5:
          document.getElementById("shieldATM").style.visibility = "hidden"
          document.getElementById("shieldGTF").style.visibility = "hidden"
          document.getElementById("shield2").style.visibility = "hidden"
          document.getElementById("shieldFLOREN").style.visibility = "visible"
          document.getElementById('gift').style.visibility = "hidden"
          break;
      }
    }

    //Metodo para finalizar el juevo
    gameOver() {
        this.stop()
        this.audioGameOver.play()
        document.getElementById("start-btn").style.visibility = "hidden"
        document.getElementById("game-over").style.visibility = "visible"
        document.getElementById("reload").style.visibility = "visible"
        document.getElementById('gift').style.visibility = "hidden"
        this.btnLive.innerText = 'Expulsado'
    }
}