class Gift {
    constructor(ctx){
        this.ctx = ctx

        this.x = ctx.canvas.width / 2 
        this.y = 0

        this.w = 70
        this.h = 70

        this.vy = 8

        this.img = new Image()
        this.img.src = './img/premio.png'
        this.img2 = new Image()
        this.img2.src = './img/amarilla.png'
    }
    

    draw (element) {
        if (element === "good") {
           this.ctx.drawImage(
                this.img,
                this.x,
                this.y,
                this.w,
                this.h
              )
        } else if (element === "bad") {
            this.ctx.drawImage(
                this.img2,
                this.x,
                this.y,
                this.w,
                this.h
              )
        }
    }

    move () {
        this.y += this.vy
    }
}