class Ball {
    constructor(ctx){
        this.ctx = ctx
        this.x = ctx.canvas.width / 2
        this.y = ctx.canvas.height - 30
        this.r = 10

        this.vx = 2
        this.vy = -2

        this.color = 'red'

        this.player = new Player(ctx)

        this.audioGameOver = new Audio('/audio/game-over.mp3')
    }

    draw(){
        this.ctx.beginPath()
        this.ctx.arc(this.x, this.y, this.r, 0, Math.PI*2)
        this.ctx.fillStyle = this.color
        this.ctx.fill()
        this.ctx.closePath()
    }

    move(){
        if (this.x + this.vx > ctx.canvas.width - this.r  || this.x + this.vx < this.r) {
            this.vx = -this.vx
        }
        if (this.y + this.vy < this.r) {
            this.vy = -this.vy
        } else if (this.y + this.vy > ctx.canvas.height - this.r){
            if (this.x > this.player.x && this.x < this.player.x + this.player.h) {
                this.vy = -this.vy
            
            } else {
                this.player.audioFin = false
                this.audioGameOver.play()
                this.vy = 0
                this.vx = 0
            }
            console.log(this.x)
            console.log(this.player.x)
            console.log(this.player.h)
            console.log(this.y)
        } 

        this.x += this.vx
        this.y += this.vy
    }

}
