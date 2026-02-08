interface Particle {
    x: number
    y: number
    vx: number
    vy: number
    radius: number
    color: string
    alpha: number
    life: number
    maxLife: number
}

export class ParticleSystem {
    private canvas: HTMLCanvasElement
    private ctx: CanvasRenderingContext2D
    private particles: Particle[] = []
    private mouseX = 0
    private mouseY = 0
    private animationId: number = 0
    private colors = ['#8b5cf6', '#ec4899', '#06b6d4', '#10b981', '#f59e0b']

    constructor(canvasId: string) {
        this.canvas = document.getElementById(canvasId) as HTMLCanvasElement
        this.ctx = this.canvas.getContext('2d')!

        this.resize()
        this.initParticles()
        this.bindEvents()
        this.animate()
    }

    private resize(): void {
        this.canvas.width = window.innerWidth
        this.canvas.height = window.innerHeight
    }

    private initParticles(): void {
        const particleCount = Math.min(100, Math.floor((window.innerWidth * window.innerHeight) / 15000))

        for (let i = 0; i < particleCount; i++) {
            this.particles.push(this.createParticle())
        }
    }

    private createParticle(): Particle {
        return {
            x: Math.random() * this.canvas.width,
            y: Math.random() * this.canvas.height,
            vx: (Math.random() - 0.5) * 0.5,
            vy: (Math.random() - 0.5) * 0.5,
            radius: Math.random() * 2 + 1,
            color: this.colors[Math.floor(Math.random() * this.colors.length)],
            alpha: Math.random() * 0.5 + 0.2,
            life: 0,
            maxLife: Math.random() * 200 + 100
        }
    }

    private bindEvents(): void {
        window.addEventListener('resize', () => this.resize())

        window.addEventListener('mousemove', (e) => {
            this.mouseX = e.clientX
            this.mouseY = e.clientY
        })
    }

    private animate = (): void => {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height)

        this.particles.forEach((particle, index) => {
            // Mouse interaction
            const dx = this.mouseX - particle.x
            const dy = this.mouseY - particle.y
            const distance = Math.sqrt(dx * dx + dy * dy)

            if (distance < 150) {
                const force = (150 - distance) / 150
                particle.vx -= (dx / distance) * force * 0.02
                particle.vy -= (dy / distance) * force * 0.02
            }

            // Update position
            particle.x += particle.vx
            particle.y += particle.vy

            // Friction
            particle.vx *= 0.99
            particle.vy *= 0.99

            // Boundary wrapping
            if (particle.x < 0) particle.x = this.canvas.width
            if (particle.x > this.canvas.width) particle.x = 0
            if (particle.y < 0) particle.y = this.canvas.height
            if (particle.y > this.canvas.height) particle.y = 0

            // Life cycle
            particle.life++
            if (particle.life > particle.maxLife) {
                this.particles[index] = this.createParticle()
            }

            // Draw particle
            this.ctx.beginPath()
            this.ctx.arc(particle.x, particle.y, particle.radius, 0, Math.PI * 2)
            this.ctx.fillStyle = particle.color
            this.ctx.globalAlpha = particle.alpha * (1 - particle.life / particle.maxLife)
            this.ctx.fill()

            // Draw connections
            this.particles.forEach((other) => {
                const dist = Math.sqrt(
                    Math.pow(particle.x - other.x, 2) + Math.pow(particle.y - other.y, 2)
                )
                if (dist < 100) {
                    this.ctx.beginPath()
                    this.ctx.moveTo(particle.x, particle.y)
                    this.ctx.lineTo(other.x, other.y)
                    this.ctx.strokeStyle = particle.color
                    this.ctx.globalAlpha = 0.1 * (1 - dist / 100)
                    this.ctx.stroke()
                }
            })
        })

        this.ctx.globalAlpha = 1
        this.animationId = requestAnimationFrame(this.animate)
    }

    public destroy(): void {
        cancelAnimationFrame(this.animationId)
    }
}
