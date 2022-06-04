class Player {
    constructor(ctx) {
        this.ctx = ctx
        this.x = ctx.canvas.width / 2 
        this.y = ctx.canvas.height - 10

        this.w = 80
        this.h = 12

        this.vx = 0

        this.color = 'red'

        this.ctx.lineWidth = 5

        this.audio = new Audio('/audio/Chiptronical.ogg')
        this.audio.loop = true
    }


    draw() {
        const prevStyle = this.ctx.fillStyle
        this.ctx.fillStyle = this.color
        this.ctx.fillRect(this.x, this.y - this.h, this.w, this.h)
        
        this.ctx.strokeStyle = 'white'
        this.ctx.strokeRect(this.x, this.y - this.h, this.w, this.h)

        this.ctx.fillStyle = prevStyle
        
        this.audio.play()
    }

    move() {  
        if (this.x + this.w > this.ctx.canvas.width) {
            this.x = this.ctx.canvas.width - this.w
            this.vx = 0;
          }

        if (this.x < 0) {
            this.x = 0
            this.vx = 0
        }
        this.x += this.vx
    }

    keyDown(key) {
        if(key === KEY_RIGHT && this.x < this.ctx.canvas.width - this.w) {
            this.vx = 6
        }
        else if(key === KEY_LEFT && this.x > 0) {
            this.vx = -6
        }
    }
    keyUp(key){
        if(key === KEY_RIGHT || key === KEY_LEFT) {
            this.vx = 0
        }
    }
}