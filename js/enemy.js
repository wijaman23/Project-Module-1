class Enemy {
    constructor(ctx) {
        this.ctx = ctx

        this.x = 0
        this.y = 0

        this.w = 74
        this.h = 21

        this.row = 3
        this.colum = 7

        this.padding = 10

        this.rect = [];

        for (let n = 0; n < this.colum; n++) {
            this.rect[n] = [];
    
            for (let m = 0 ; m < this.row; m++) {
                this.rect [n][m] = { x: 0, y: 0 }
            }
        }

        this.rectX = 0
        this.rectY = 0
    }

    draw() {
        for (let n = 0; n < this.colum; n++) {
            for (let m = 0; m < this.row; m++) {
                this.rectX = (n * (this.w + this.padding)) + this.padding
                this.rectY = (m * (this.h + this.padding)) + this.padding
                this.rect[n][m].x = this.rectX
                this.rect[n][m].y = this.rectY

                const prevStyle = this.ctx.fillStyle
                this.ctx.fillStyle = 'white'
                this.ctx.rect(this.rectX, this.rectY, this.w, this.h)
                this.ctx.fill()
                this.ctx.fillStyle = prevStyle
            }
        }
    }


}

