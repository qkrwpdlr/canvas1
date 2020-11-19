class App {
    constructor() {
        this.canvas = document.createElement("canvas")
        document.body.appendChild(this.canvas)
        this.ctx = this.canvas.getContext("2d")

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
    }
    clear() {
        this.ctx.clearRect(0, 0, this.stageWidth, this.stageHeight)
    }
}

window.onload = () => {
    new App()
}