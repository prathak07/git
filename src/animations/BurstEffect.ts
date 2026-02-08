interface BurstParticle {
    element: HTMLElement
    x: number
    y: number
    vx: number
    vy: number
    life: number
    maxLife: number
    gravity: number
}

export class BurstEffect {
    private colors = ['#8b5cf6', '#ec4899', '#06b6d4', '#10b981', '#f59e0b', '#ef4444']
    private particles: BurstParticle[] = []
    private isAnimating = false

    constructor() { }

    public createBurst(container: HTMLElement, x: number, y: number, particleCount = 25): void {
        for (let i = 0; i < particleCount; i++) {
            const particle = this.createParticle(container, x, y)
            this.particles.push(particle)
        }

        if (!this.isAnimating) {
            this.isAnimating = true
            this.animate()
        }
    }

    public createBurstAtEvent(e: MouseEvent): void {
        const container = document.body
        this.createBurst(container, e.clientX, e.clientY, 15)
    }

    private createParticle(container: HTMLElement, x: number, y: number): BurstParticle {
        const element = document.createElement('div')
        element.className = 'burst-particle'

        const color = this.colors[Math.floor(Math.random() * this.colors.length)]
        const size = Math.random() * 8 + 4
        const angle = Math.random() * Math.PI * 2
        const velocity = Math.random() * 8 + 4

        element.style.cssText = `
      position: absolute;
      width: ${size}px;
      height: ${size}px;
      background: ${color};
      border-radius: 50%;
      left: ${x}px;
      top: ${y}px;
      pointer-events: none;
      box-shadow: 0 0 ${size}px ${color};
      z-index: 1000;
    `

        container.appendChild(element)

        return {
            element,
            x,
            y,
            vx: Math.cos(angle) * velocity,
            vy: Math.sin(angle) * velocity,
            life: 0,
            maxLife: 60 + Math.random() * 30,
            gravity: 0.15
        }
    }

    private animate = (): void => {
        this.particles = this.particles.filter((particle) => {
            particle.life++

            if (particle.life >= particle.maxLife) {
                particle.element.remove()
                return false
            }

            // Physics
            particle.vy += particle.gravity
            particle.x += particle.vx
            particle.y += particle.vy

            // Friction
            particle.vx *= 0.98
            particle.vy *= 0.98

            // Update element
            const progress = particle.life / particle.maxLife
            const scale = 1 - progress
            const opacity = 1 - progress

            particle.element.style.transform = `translate(-50%, -50%) scale(${scale})`
            particle.element.style.left = `${particle.x}px`
            particle.element.style.top = `${particle.y}px`
            particle.element.style.opacity = `${opacity}`

            return true
        })

        if (this.particles.length > 0) {
            requestAnimationFrame(this.animate)
        } else {
            this.isAnimating = false
        }
    }
}
