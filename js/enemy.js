class Enemy {
    constructor(ctx) {
        this.ctx = ctx

        this.x = 0
        this.y = 0

        this.w = 110
        this.h = 25

        this.row = 7
        this.colum = 3

        this.padding = 10

        this.rect = []

        this.createRect()
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
    createRect (){
        for (let n = 0; n < this.row; n++) {
            this.rect[n] = [];
    
            for (let m = 0 ; m < this.colum; m++) {
                this.rect [n][m] = {
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
        for (let n = 0; n < this.row; n++) {
            for (let m = 0; m < this.colum; m++) {
                
                let b = this.rect[n][m]

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

