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

        this.life = 3
    }

    //Metodo de inicio del juego
    start() {
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
        this.player.audio.pause()
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
    }    

    //Mertodo que llama a todos los eventos que realizan el movimiento
    move() {
        this.bg.move()
        this.ball.move()
        this.player.move()
        this.colisionPlayerBall()
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

    //Metodo colision pelota y jugador
    colisionPlayerBall(){
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

}