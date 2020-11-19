import { BounceString } from "./bounceString.js"
class App {
    constructor() {
        this.canvas = document.createElement("canvas")
        document.body.appendChild(this.canvas)
        this.ctx = this.canvas.getContext("2d")

        this.pixelRation = 1
        window.addEventListener("resize", () => this.resize(), false)
        this.strings = []
        this.moveX = -5000
        this.moveY = -5000
        this.isDown = false
        this.resize()
        document.addEventListener("mousedown", (e) => this.mouseDown(e))
        document.addEventListener("mousemove", (e) => this.mouseMove(e))
        document.addEventListener("mouseup", (e) => this.mouseUp(e))

        window.requestAnimationFrame(() => this.animation())
    }
    resize() {
        this.stageWidth = document.body.clientWidth
        this.stageHeight = document.body.clientHeight

        this.canvas.width = this.stageWidth * this.pixelRation
        this.canvas.height = this.stageHeight * this.pixelRation
        this.ctx.scale(this.pixelRation, this.pixelRation)

        const xGap = 20
        const yGap = 20
        const x1 = xGap
        const x2 = this.stageWidth - xGap
        const total = Math.floor((this.stageHeight - yGap) / yGap)
        for (let i = 0; i < total; i++) {
            this.strings[i] =
                new BounceString({
                    x1: x1,
                    y1: i * yGap + yGap,
                    x2: x2,
                    y2: i * yGap + yGap
                })
        }
    }
    animation() {
        window.requestAnimationFrame(() => this.animation())
        this.clear()
        if (this.strings.length > 0) {
            for (let i = 0; i < this.strings.length; i++) {
                this.strings[i].animation(this.ctx, this.moveX, this.moveY)
            }
        }
    }
    clear() {
        this.ctx.clearRect(0, 0, this.stageWidth, this.stageHeight)
    }
    mouseMove(e) {
        if (this.isDown) {
            this.moveX = e.clientX
            this.moveY = e.clientY
        }
    }
    mouseUp(e) {
        this.isDown = false
        this.moveX = e.clientX
        this.moveY = e.clientY
    }
    mouseDown(e) {
        this.isDown = true
        this.moveX = e.clientX
        this.moveY = e.clientY
    }
}

window.onload = () => {
    new App()
}