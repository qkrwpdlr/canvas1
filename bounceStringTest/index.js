import { Line, Sprite } from "./test.js"
import { getPosition } from "./utils.js"
class App {
    constructor() {
        this.canvas = document.createElement("canvas")
        document.body.appendChild(this.canvas)
        this.ctx = this.canvas.getContext("2d")
        this.objs = []
        this.callbacks = []
        this.pixelRation = 1
        window.addEventListener("resize", () => this.resize(), false)
        this.resize()

        window.requestAnimationFrame(() => this.animation())
    }
    resize() {
        this.stageWidth = document.body.clientWidth
        this.stageHeight = document.body.clientHeight

        this.canvas.width = this.stageWidth * this.pixelRation
        this.canvas.height = this.stageHeight * this.pixelRation
    }
    animation() {
        window.requestAnimationFrame(() => this.animation())
        this.clear()
        for (let callback of this.callbacks) {
            callback()
        }
        for (let obj of this.objs) {
            this.ctx.save()
            obj.animation(this.ctx)
            this.ctx.restore()
        }
    }
    clear() {
        this.ctx.clearRect(0, 0, this.stageWidth, this.stageHeight)
    }
    add(obj) {
        this.objs.push(obj)
    }
    addEventListener(event, eventCallback) {
        this.canvas.addEventListener(event, eventCallback)
    }
    addAnimationFrame(callback) {
        this.callbacks.push(callback)
    }
}

window.onload = () => {
    const app = new App()
    const line = new Line({
        x: 100,
        y: 500
    }, {
        x: 1100,
        y: 500
    })

    app.addEventListener("mousemove", (e) => {
        if (line.isSelected) {
            line.curvePointX = e.clientX
            line.curvePointY = e.clientY
        }
    })
    app.addEventListener("mousedown", () => {
        line.isSelected = true
    })
    app.addEventListener("mouseup", () => {
        line.isSelected = false
    })

    const sprite = new Sprite()
    sprite.x = 100
    let time = 0
    let alpha = 0.003
    let arrow = 1
    app.addAnimationFrame(() => {
        const { x, y, angle } = getPosition(
            { x: line.startX, y: line.startY },
            { x: line.curvePointX, y: line.curvePointY },
            { x: line.endX, y: line.endY },
            time
        )
        if (time > 1 || time < 0) {
            arrow *= -1
        }
        sprite.rotate = angle
        time += alpha * arrow
        sprite.x = x
        sprite.y = y
        sprite.arrow = arrow
    })
    app.add(sprite)
    app.add(line)
}