class Ball {
    constructor(ctx){
        this.ctx = ctx
        this.r = 8
        this.x = ctx.canvas.width / 2
        this.y = ctx.canvas.height - this.r
        
        this.speed = 8

        this.vx = 8 * (Math.random() * 2 - 1)
        this.vy = -8
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
}
