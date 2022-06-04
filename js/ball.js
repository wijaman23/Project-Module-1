class Ball {
    constructor(ctx){
        this.ctx = ctx
        this.r = 8
        this.x = ctx.canvas.width / 2
        this.y = ctx.canvas.height - this.r
        
        this.speed = 4

        this.vx = 3 * (Math.random() * 2 - 1)
        this.vy = -3

        this.audioColl = new Audio('/audio/crash.mp3')
    }

    draw(){
        this.ctx.beginPath()
        this.ctx.arc(this.x, this.y, this.r, 0, Math.PI*2)

        this.ctx.fillStyle = 'red'
        this.ctx.fill()

        this.ctx.strokeStyle = 'yellow'
        this.ctx.stroke()

        this.ctx.closePath()
    }

    move(){
        this.x += this.vx
        this.y += this.vy

        if (this.x + this.r > this.ctx.canvas.width || this.x - this.r < 0){ 
            this.vx = -this.vx
        }
        if (this.y - this.r < 0){
            this.vy = -this.vy
        }
    }

}
