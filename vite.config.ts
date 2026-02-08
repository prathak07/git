import { defineConfig } from 'vite'

export default defineConfig({
    base: '/git/', // GitHub Pages base path
    build: {
        outDir: 'dist',
        assetsDir: 'assets',
    },
})
