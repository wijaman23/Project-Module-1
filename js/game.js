class Game {
    constructor(ctx){
        this.ctx = ctx
        this.interval = null

        this.bg = new Background(ctx)
        this.ball = new Ball(ctx)
        this.player = new Player(ctx)
        this.enemy = new Enemy(ctx)

        this.setListeners();
    }

    start() {
        this.interval = setInterval(() =>{
          if (this.player.audioFin === true) {
            this.clear()
            this.draw()
            this.move()
          } else {
            this.gameOver()
          }
        }, 1000 / 60)
      }

    stop() {
        clearInterval(this.interval)
        this.interval = null
        this.player.audio.pause()
    }

    clear() {
        this.ctx.clearRect(
          0, 0, this.ctx.canvas.with, this.ctx.canvas.height
        )
    }

    draw() {
        this.bg.draw()
        this.ball.draw()
        this.player.draw()
       // this.enemy.draw()
    }    

    move() {
        this.bg.move()
        this.ball.move()
        this.player.move()
    }
    
    gameOver(){
      clearInterval(this.interval)
      this.interval = null
      this.player.audio.pause()
    }

    setListeners() {
        document.addEventListener('keydown', (e) => {
          this.player.keyDown(e.keyCode)
        })
        document.addEventListener('keyup', (e) => {
          this.player.keyUp(e.keyCode)
        })
    }
}