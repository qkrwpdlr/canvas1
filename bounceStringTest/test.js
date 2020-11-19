export class Line {
    constructor(startPoint, endPoint) {
        this.startX = startPoint.x
        this.startY = startPoint.y
        this.endX = endPoint.x
        this.endY = endPoint.y
        this.curvePointX = (this.startX + this.endX) / 2
        this.curvePointY = (this.startY + this.endY) / 2
        this.originCurvePointX = this.curvePointX
        this.originCurvePointY = this.curvePointY
        this.isSelected = false
        this.bounse = 0.95
    }
    /**
     * 
     * @param {CanvasRenderingContext2D} ctx 
     */
    animation(ctx) {
        const { isSelected } = this
        if (!isSelected) {
            const dx = this.originCurvePointX - this.curvePointX
            const dy = this.originCurvePointY - this.curvePointY
            this.curvePointX += 2 * dx * this.bounse
            this.curvePointY += 2 * dy * this.bounse
        }
        ctx.beginPath()
        ctx.moveTo(this.startX, this.startY)
        ctx.quadraticCurveTo(this.curvePointX, this.curvePointY, this.endX, this.endY);
        ctx.stroke()
    }

}
export class Sprite {
    constructor() {
        this.x = 0
        this.y = 0
        this.size = 100
        this.rotate = 0
        this.arrow = 1
        this.img = new Image()
        this.index = 0
        this.imgs = []
        for (let i = 1; i < 21; i++)this.addImage(`/bounceStringTest/assets/Run (${i}).png`)
    }
    /**
     * 
     * @param {CanvasRenderingContext2D} ctx 
     */
    animation(ctx) {
        ctx.beginPath()
        this.index += 1
        ctx.translate(this.x, this.y)
        ctx.rotate(-this.rotate)
        if (this.arrow > 0) ctx.scale(1, 1);
        else ctx.scale(-1, 1);
        ctx.drawImage(this.imgs[this.index % 20], -this.size, -this.size, this.size, this.size);
        ctx.stroke()
    }
    addImage(src) {
        const img = new Image()
        img.src = src
        this.imgs.push(img)
    }
}
