export class CountUpAnimation {
    private element: HTMLElement
    private target: number
    private current = 0
    private duration = 2000 // ms
    private startTime: number | null = null

    constructor(element: HTMLElement, target: number) {
        this.element = element
        this.target = target
        this.animate()
    }

    private easeOutExpo(t: number): number {
        return t === 1 ? 1 : 1 - Math.pow(2, -10 * t)
    }

    private animate = (timestamp?: number): void => {
        if (!this.startTime) {
            this.startTime = timestamp || performance.now()
        }

        const elapsed = (timestamp || performance.now()) - this.startTime
        const progress = Math.min(elapsed / this.duration, 1)
        const easedProgress = this.easeOutExpo(progress)

        this.current = Math.floor(easedProgress * this.target)
        this.element.textContent = this.current.toString()

        if (progress < 1) {
            requestAnimationFrame(this.animate)
        } else {
            this.element.textContent = this.target.toString()
        }
    }
}
