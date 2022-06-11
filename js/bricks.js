class Bricks {
    constructor(ctx) {
        this.ctx = ctx

        this.x = 0
        this.y = 0

        this.w = 110
        this.h = 25

        this.row = 3
        this.colum = 7

        this.padding = 10

        this.brick = []

        this.createBrick()
        this.countCreate = 0

        this.img = new Image()
        this.img.src = '/img/leganes.jpeg'
        this.img2 = new Image()
        this.img2.src = '/img/rayo.jpeg'
        this.img3 = new Image()
        this.img3.src = '/img/atletico.jpeg'
        this.img4 = new Image()
        this.img4.src = '/img/getafe.jpeg'
    }
    //metodo para crear los enemigos
    createBrick (){
        for (let n = 0; n < this.colum; n++) {
            this.brick[n] = [];
    
            for (let m = 0 ; m < this.row; m++) {
                this.brick [n][m] = {
                    x: n * (this.w + this.padding) + this.padding, 
                    y: m * (this.h + this.padding) + this.padding, 
                    status: true,
                }
            }
        }
        this.countCreate++
    }
    //Metodo para dibujar los enemigos
    draw() { 
        for (let n = 0; n < this.colum; n++) {
            for (let m = 0; m < this.row; m++) {
                
                let b = this.brick[n][m]

                if(b.status && (!this.countCreate)){
                    this.ctx.drawImage(
                        this.img,
                        b.x,
                        b.y,
                        this.w,
                        this.h
                      )
                } else if (b.status && this.countCreate === 1) {
                    this.ctx.drawImage(
                        this.img2,
                        b.x,
                        b.y,
                        this.w,
                        this.h
                    )
                } else if (b.status && this.countCreate === 2) {
                    this.ctx.drawImage(
                        this.img4,
                        b.x,
                        b.y,
                        this.w,
                        this.h
                    )
                } else if (b.status && this.countCreate > 2) {
                    this.ctx.drawImage(
                        this.img3,
                        b.x,
                        b.y,
                        this.w,
                        this.h
                    )
                }
            }
        }
    }
}

