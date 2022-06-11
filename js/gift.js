class Gift {
    constructor(ctx){
        this.ctx = ctx

        this.x = 100
        this.y = 0

        this.w = 70
        this.h = 70

        this.vy = 5

        this.img = new Image()
        this.img.src = '/img/premio.png'
        this.img2 = new Image()
        this.img2.src = '/img/amarilla.png'

        this.audioGift = new Audio('/audio/match1.wav')
    }
    

    draw (element) {
        console.log(element)
        if (element === true) {
           this.ctx.drawImage(
                this.img,
                this.x,
                this.y,
                this.w,
                this.h
              )
        } else if (element === false){
            this.ctx.drawImage(
                this.img2,
                this.x,
                this.y,
                this.w,
                this.h
              )
        }
        this.audioGift.play()
    }

    move (){
        this.y += this.vy
    }
}