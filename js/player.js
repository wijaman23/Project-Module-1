class Player {
    constructor(ctx) {
        this.ctx = ctx
        this.x = ctx.canvas.width / 2 
        this.y = ctx.canvas.height - 10

        this.w = 75
        this.h = 10

        this.vx = 0

        this.color = 'red'

        this.audio = new Audio('/audio/Chiptronical.ogg')
        this.audio.loop = true
        this.audioFin = true
    }


    draw() {
        this.ctx.rect(this.x, this.y, this.w, this.h)
        this.ctx.fillStyle = this.color
        this.ctx.fill()
        
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
        if(key === KEY_RIGHT) {
            this.vx = 6
        }
        else if(key === KEY_LEFT) {
            this.vx = -6
        }
    }
    keyUp(key){
        if(key === KEY_RIGHT || key === KEY_LEFT) {
            this.vx = 0
        }
    }
}