class Ball {
    constructor(ctx){
        this.ctx = ctx
        this.r = 8
        this.x = ctx.canvas.width / 2
        this.y = ctx.canvas.height - this.r
        
        this.speed = 10

        this.vx = 6 * (Math.random() * 2 - 1)
        this.vy = -6
    }

    draw(){
        this.ctx.beginPath()
        this.ctx.arc(this.x, this.y, this.r, 0, Math.PI*2)
        this.ctx.fillStyle = 'white'
        this.ctx.fill()
        this.ctx.closePath()
    }

    move(){
        this.x += this.vx
        this.y += this.vy
    }

    collisionBall(){
        if (this.x + this.r > this.ctx.canvas.width || this.x - this.r < 0) { 
            this.vx = -this.vx
          }
    
          if (this.y - this.r < 0) {
            this.vy = -this.vy
          }
    }

    collideWith(element){
        return this.x < element.x + element.w && this.x > element.x && 
            element.y < element.y + element.h && this.y > element.y
    }

    resetBall(){
        this.x = this.ctx.canvas.width / 2
        this.y = this.ctx.canvas.height - this.r
  
        //Se da velocidad de lanzamiento cuando toque la pala y se hace aleatoriamente la salida
        this.vx = 8 * (Math.random() * 2 - 1)
        this.vy = -8
      }
}
