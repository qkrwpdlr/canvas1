import { lineCircle } from "./utils.js"

const BOUNCE = 0.9
export class BounceString {
    constructor(pos, color) {
        const middleX = ((pos.x2 - pos.x1) / 2) + pos.x1
        const middleY = ((pos.y2 - pos.y1) / 2) + pos.y1
        this.positions = [
            {
                x: pos.x1,
                y: pos.y1,
                ox: pos.x1,
                oy: pos.y1,
                vx: 0,
                vy: 0,
            }, {
                x: middleX,
                y: middleY,
                ox: middleX,
                oy: middleY,
                vx: 0,
                vy: 0,
            }, {
                x: pos.x2,
                y: pos.y2,
                ox: pos.x2,
                oy: pos.y2,
                vx: 0,
                vy: 0,
            },
        ]
        this.detect = 10
        this.color = color
    }
    animation(ctx, moveX, moveY) {
        ctx.beginPath()
        ctx.fillStyle = "#ff00ff"
        ctx.arc(moveX, moveY, 30, 0, Math.PI * 2, false)
        ctx.fill()

        ctx.beginPath()
        ctx.strokeStyle = this.color
        ctx.lineWidth = 4
        if (lineCircle(
            this.positions[0].x,
            this.positions[0].y,
            this.positions[2].x,
            this.positions[2].y,
            moveX,
            moveY,
            this.detect
        )) {
            this.detect = 300
            let tx = (this.positions[1].ox + moveX) / 2
            let ty = moveY
            this.positions[1].vx = tx - this.positions[1].x
            this.positions[1].vy = ty - this.positions[1].y
        } else {
            this.detect = 10
            let tx = this.positions[1].ox
            let ty = this.positions[1].oy
            this.positions[1].vx += tx - this.positions[1].x
            this.positions[1].vx *= BOUNCE
            this.positions[1].vy += ty - this.positions[1].y
            this.positions[1].vy *= BOUNCE
        }
        this.positions[1].x += this.positions[1].vx
        this.positions[1].y += this.positions[1].vy

        let prevX = this.positions[0].x
        let prevY = this.positions[0].y

        ctx.moveTo(prevX, prevY)
        for (let i = 0; i < this.positions.length; i++) {
            const cx = (prevX + this.positions[i].x) / 2
            const cy = (prevY + this.positions[i].y) / 2
            ctx.quadraticCurveTo(prevX, prevY, cx, cy)
            prevX = this.positions[i].x
            prevY = this.positions[i].y
        }
        ctx.lineTo(prevX, prevY)
        ctx.stroke()
    }
}