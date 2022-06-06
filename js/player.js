class Player {
    constructor(ctx) {
        this.ctx = ctx
        this.x = ctx.canvas.width / 2 
        this.y = ctx.canvas.height - 50

        this.w = 150
        this.h = 40

        this.vx = 0

        this.img = new Image()
        this.img.src = '/img/barra.png'
    }


    draw() {
        this.ctx.drawImage(
            this.img,
            this.x,
            this.y,
            this.w,
            this.h
          )
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