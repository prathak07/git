import './style.css'
import { ParticleSystem } from './animations/ParticleSystem'
import { CursorEffects } from './animations/CursorEffects'
import { BurstEffect } from './animations/BurstEffect'
import { CountUpAnimation } from './animations/CountUp'

// App initialization
class App {
  private _particleSystem: ParticleSystem
  private cursorEffects: CursorEffects
  private burstEffect: BurstEffect

  constructor() {
    this.render()
    // Store reference for potential cleanup
    this._particleSystem = new ParticleSystem('particle-canvas')
    this.cursorEffects = new CursorEffects()
    this.burstEffect = new BurstEffect()
    this.initInteractions()
    this.initCountUp()
  }

  // Getter for particle system (useful for debugging/extending)
  get particleSystem(): ParticleSystem {
    return this._particleSystem
  }

  private render(): void {
    const app = document.querySelector<HTMLDivElement>('#app')!

    app.innerHTML = `
      <canvas id="particle-canvas"></canvas>
      <div class="cursor-follower" id="cursor-follower"></div>
      <div class="cursor-glow" id="cursor-glow"></div>

      <nav class="nav">
        <div class="nav-logo">✦ Animations</div>
        <ul class="nav-links">
          <li><a href="#demos">Demos</a></li>
          <li><a href="#interactive">Interactive</a></li>
          <li><a href="#stats">Stats</a></li>
        </ul>
      </nav>

      <section class="hero">
        <div class="hero-badge">
          <span class="dot"></span>
          Built with TypeScript
        </div>
        <h1>Experience the <span class="gradient">Magic</span></h1>
        <p class="hero-subtitle">
          A showcase of modern CSS animations and interactive JavaScript effects. 
          Move your cursor, click anywhere, and explore the possibilities.
        </p>
        <div class="hero-buttons">
          <button class="btn btn-primary" id="explore-btn">
            🚀 Explore Demos
          </button>
          <button class="btn btn-secondary" id="github-btn">
            ⭐ View Source
          </button>
        </div>
        <div class="scroll-indicator">
          <span>Scroll to explore</span>
          <div class="mouse"></div>
        </div>
      </section>

      <section class="section" id="demos">
        <div class="section-header">
          <h2>Animation Showcase</h2>
          <p>Hover over the cards to see the magic happen</p>
        </div>
        
        <div class="cards-grid">
          <div class="card" data-animation="bounce">
            <div class="card-icon purple">🎾</div>
            <h3>Bouncing</h3>
            <p>Elastic bounce animations with staggered timing for a playful feel.</p>
            <div class="preview-area">
              <div class="bounce-demo">
                <div class="bounce-ball"></div>
                <div class="bounce-ball"></div>
                <div class="bounce-ball"></div>
                <div class="bounce-ball"></div>
                <div class="bounce-ball"></div>
              </div>
            </div>
          </div>

          <div class="card" data-animation="wave">
            <div class="card-icon pink">📊</div>
            <h3>Wave Bars</h3>
            <p>Audio visualizer-style bars dancing to an imaginary beat.</p>
            <div class="preview-area">
              <div class="wave-demo" id="wave-demo"></div>
            </div>
          </div>

          <div class="card" data-animation="orbit">
            <div class="card-icon cyan">🪐</div>
            <h3>Orbital Motion</h3>
            <p>Planets orbiting around a central star with smooth rotations.</p>
            <div class="preview-area">
              <div class="orbit-demo">
                <div class="orbit-center"></div>
                <div class="orbit-ring">
                  <div class="orbit-planet"></div>
                </div>
                <div class="orbit-ring">
                  <div class="orbit-planet"></div>
                </div>
              </div>
            </div>
          </div>

          <div class="card" data-animation="morph">
            <div class="card-icon green">🔮</div>
            <h3>Morphing Shapes</h3>
            <p>Fluid shape transformations using border-radius keyframes.</p>
            <div class="preview-area">
              <div class="morph-demo"></div>
            </div>
          </div>

          <div class="card" data-animation="typing">
            <div class="card-icon orange">⌨️</div>
            <h3>Typing Effect</h3>
            <p>Classic typewriter animation perfect for hero sections.</p>
            <div class="preview-area">
              <div class="typing-demo">console.log("Hello!")</div>
            </div>
          </div>

          <div class="card" data-animation="particles">
            <div class="card-icon blue">✨</div>
            <h3>Particle System</h3>
            <p>Canvas-based particles responding to mouse movement.</p>
            <div class="preview-area">
              <div class="particle-demo" id="mini-particles"></div>
            </div>
          </div>
        </div>
      </section>

      <section class="section interactive-section" id="interactive">
        <div class="section-header">
          <h2>Interactive Playground</h2>
          <p>Click anywhere in the box below to create a burst effect</p>
        </div>
        
        <div class="interactive-area">
          <h3>Click Burst Effect</h3>
          <p>Each click spawns colorful particles that explode outward</p>
          <div class="click-area" id="click-area">
            <span>Click anywhere!</span>
          </div>
        </div>
      </section>

      <section class="section" id="stats">
        <div class="section-header">
          <h2>By the Numbers</h2>
          <p>This demo showcases various animation techniques</p>
        </div>
        
        <div class="stats">
          <div class="stat-item">
            <div class="stat-number" data-count="6">0</div>
            <div class="stat-label">Animation Types</div>
          </div>
          <div class="stat-item">
            <div class="stat-number" data-count="100">0</div>
            <div class="stat-label">Particles Active</div>
          </div>
          <div class="stat-item">
            <div class="stat-number" data-count="60">0</div>
            <div class="stat-label">FPS Target</div>
          </div>
          <div class="stat-item">
            <div class="stat-number" data-count="0">0</div>
            <div class="stat-label">Dependencies</div>
          </div>
        </div>
      </section>

      <footer class="footer">
        <p>Built with 💜 using <a href="https://vitejs.dev" target="_blank">Vite</a> + <a href="https://www.typescriptlang.org" target="_blank">TypeScript</a></p>
      </footer>
    `

    // Generate wave bars
    this.generateWaveBars()
    // Generate mini particles
    this.generateMiniParticles()
  }

  private generateWaveBars(): void {
    const waveDemo = document.getElementById('wave-demo')
    if (!waveDemo) return

    for (let i = 0; i < 20; i++) {
      const bar = document.createElement('div')
      bar.className = 'wave-bar'
      bar.style.animationDelay = `${i * 0.05}s`
      waveDemo.appendChild(bar)
    }
  }

  private generateMiniParticles(): void {
    const container = document.getElementById('mini-particles')
    if (!container) return

    for (let i = 0; i < 15; i++) {
      const particle = document.createElement('div')
      particle.className = 'mini-particle'
      particle.style.left = `${10 + Math.random() * 80}%`
      particle.style.top = `${20 + Math.random() * 60}%`
      particle.style.animationDelay = `${Math.random() * 3}s`
      particle.style.background = ['#8b5cf6', '#ec4899', '#06b6d4', '#10b981'][Math.floor(Math.random() * 4)]
      container.appendChild(particle)
    }
  }

  private initInteractions(): void {
    // Explore button smooth scroll
    document.getElementById('explore-btn')?.addEventListener('click', () => {
      document.getElementById('demos')?.scrollIntoView({ behavior: 'smooth' })
    })

    // GitHub button
    document.getElementById('github-btn')?.addEventListener('click', () => {
      window.open('https://github.com', '_blank')
    })

    // Click area burst effect
    const clickArea = document.getElementById('click-area')
    clickArea?.addEventListener('click', (e) => {
      const rect = clickArea.getBoundingClientRect()
      const x = e.clientX - rect.left
      const y = e.clientY - rect.top
      this.burstEffect.createBurst(clickArea, x, y)
    })

    // Card hover expand cursor
    document.querySelectorAll('.card').forEach((card) => {
      card.addEventListener('mouseenter', () => {
        this.cursorEffects.expand()
      })
      card.addEventListener('mouseleave', () => {
        this.cursorEffects.shrink()
      })
      card.addEventListener('click', (e) => {
        this.burstEffect.createBurstAtEvent(e as MouseEvent)
      })
    })

    // Button hover effects
    document.querySelectorAll('.btn').forEach((btn) => {
      btn.addEventListener('mouseenter', () => this.cursorEffects.expand())
      btn.addEventListener('mouseleave', () => this.cursorEffects.shrink())
    })
  }

  private initCountUp(): void {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const statNumbers = entry.target.querySelectorAll('.stat-number')
          statNumbers.forEach((el) => {
            const target = parseInt(el.getAttribute('data-count') || '0', 10)
            new CountUpAnimation(el as HTMLElement, target)
          })
          observer.unobserve(entry.target)
        }
      })
    }, { threshold: 0.5 })

    const statsSection = document.getElementById('stats')
    if (statsSection) {
      observer.observe(statsSection)
    }
  }
}

// Initialize app
new App()
