class Enemy {
    constructor(ctx) {
        this.ctx = ctx

        this.x = 0
        this.y = 0

        this.row = 3
        this.colum = 5

        this.w = 75
        this.h = 20

        this.padding = 10
        this.marginTop = 30
        this.marginLeft = 30

        this.rect = [];

        this.rectX = 0
        this.rectY = 0
    }

    draw() {

        for (let k = 0; k < this.colum; k++) {
            this.rect[k] = []

            for(let m = 0; m < this.row; m++) {
                this.rectX = (k * (this.w + this.padding)) + this.marginLeft;
                this.rectY = (m * (this.h + this.padding)) + this.marginTop;

                this.rect[k][m].this.x = rectX;
                this.rect[k][m].this.y = rectY;

                this.ctx.rect(this.x, this.y, this.w, this.h)
                this.ctx.fillStyle = "white"
                this.ctx.fill()
            }
        }
    }
}

