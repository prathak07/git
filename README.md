# ✨ Animation Playground

A stunning interactive animation showcase built with **TypeScript** and **Vite**. Features modern CSS animations, canvas-based particle systems, and interactive effects — all with zero dependencies.

![Animation Preview](https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white)
![Vite](https://img.shields.io/badge/Vite-646CFF?style=for-the-badge&logo=vite&logoColor=white)

## 🚀 Live Demo

Visit: [https://your-username.github.io/git/](https://your-username.github.io/git/)

## ✨ Features

| Animation | Description |
|-----------|-------------|
| 🎾 **Bouncing** | Elastic bounce animations with staggered timing |
| 📊 **Wave Bars** | Audio visualizer-style dancing bars |
| 🪐 **Orbital Motion** | Planets orbiting around a central star |
| 🔮 **Morphing Shapes** | Fluid shape transformations using CSS keyframes |
| ⌨️ **Typing Effect** | Classic typewriter animation |
| ✨ **Particle System** | Canvas-based particles responding to mouse movement |

### Interactive Effects

- **Cursor Following** — A smooth glow that follows your mouse
- **Click Burst** — Colorful particle explosions on click
- **Hover States** — Cards lift and icons animate on hover
- **Count Up** — Animated statistics when scrolling into view

## 🛠️ Getting Started

### Prerequisites

- Node.js 18+ 
- npm or yarn

### Installation

```bash
# Clone the repository
git clone https://github.com/your-username/git.git
cd git

# Install dependencies
npm install

# Start development server
npm run dev
```

The app will be available at `http://localhost:5173/git/`

### Build for Production

```bash
npm run build
```

The built files will be in the `dist/` folder.

## 📁 Project Structure

```
git/
├── src/
│   ├── animations/
│   │   ├── ParticleSystem.ts   # Canvas particle system
│   │   ├── CursorEffects.ts    # Mouse following effects
│   │   ├── BurstEffect.ts      # Click burst particles
│   │   └── CountUp.ts          # Number animation
│   ├── main.ts                 # App entry point
│   └── style.css               # All styles
├── index.html                  # HTML template
├── vite.config.ts              # Vite configuration
└── package.json
```

## 🚀 Deploy to GitHub Pages

1. Build the project:
   ```bash
   npm run build
   ```

2. Commit and push the `dist/` folder (or set up GitHub Actions)

3. Go to **Settings → Pages** in your repository

4. Set source to your branch and `/dist` folder

5. Your site will be live at `https://your-username.github.io/git/`

## 🎨 Customization

Edit the CSS variables in `src/style.css`:

```css
:root {
  --primary: #8b5cf6;      /* Purple */
  --secondary: #ec4899;    /* Pink */
  --accent: #06b6d4;       /* Cyan */
  --success: #10b981;      /* Green */
  --warning: #f59e0b;      /* Orange */
  --dark: #0a0a0f;         /* Background */
}
```

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

---

Built with 💜 using [Vite](https://vitejs.dev) + [TypeScript](https://www.typescriptlang.org)
