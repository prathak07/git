export class CursorEffects {
    private follower: HTMLElement | null
    private glow: HTMLElement | null
    private mouseX = 0
    private mouseY = 0
    private followerX = 0
    private followerY = 0
    private glowX = 0
    private glowY = 0
    private isExpanded = false

    constructor() {
        this.follower = document.getElementById('cursor-follower')
        this.glow = document.getElementById('cursor-glow')

        this.bindEvents()
        this.animate()
    }

    private bindEvents(): void {
        window.addEventListener('mousemove', (e) => {
            this.mouseX = e.clientX
            this.mouseY = e.clientY
        })

        // Hide cursor when leaving window
        document.addEventListener('mouseleave', () => {
            if (this.follower) this.follower.style.opacity = '0'
            if (this.glow) this.glow.style.opacity = '0'
        })

        document.addEventListener('mouseenter', () => {
            if (this.follower) this.follower.style.opacity = '1'
            if (this.glow) this.glow.style.opacity = '1'
        })
    }

    private animate = (): void => {
        // Smooth following for cursor dot
        const followerSpeed = 0.15
        this.followerX += (this.mouseX - this.followerX) * followerSpeed
        this.followerY += (this.mouseY - this.followerY) * followerSpeed

        // Even smoother for glow
        const glowSpeed = 0.08
        this.glowX += (this.mouseX - this.glowX) * glowSpeed
        this.glowY += (this.mouseY - this.glowY) * glowSpeed

        if (this.follower) {
            this.follower.style.left = `${this.followerX}px`
            this.follower.style.top = `${this.followerY}px`
        }

        if (this.glow) {
            this.glow.style.left = `${this.glowX}px`
            this.glow.style.top = `${this.glowY}px`
        }

        requestAnimationFrame(this.animate)
    }

    public expand(): void {
        if (!this.isExpanded && this.follower) {
            this.follower.classList.add('expanded')
            this.isExpanded = true
        }
    }

    public shrink(): void {
        if (this.isExpanded && this.follower) {
            this.follower.classList.remove('expanded')
            this.isExpanded = false
        }
    }
}
