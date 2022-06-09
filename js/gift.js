class Gift {
    constructor(ctx){
        this.ctx = ctx

        this.x = 100
        this.y = 0

        this.w = 50
        this.h = 50

        this.vy = 6

        this.img = new Image()
        this.img.src = '/img/premio.png'
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

    move(){
        this.y += this.vy
    }
}