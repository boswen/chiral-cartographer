import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
// import tailwindcss from '@tailwindcss/vite'
import path from 'path'

// https://vite.dev/config/
export default defineConfig({
  // List plugins used
  plugins: [react()],

  // Vite root = repo root
  root: '',

  // Build output goes to /dist at the repo root
  build: {
    outDir: path.resolve(__dirname, 'dist'),
    emptyOutDir: true,

    // Define multiple entry points for the splash and app
    rollupOptions: {
      input: {
        // splash at /
        splash: path.resolve(__dirname, 'index.html'),
        // app at /app
        app: path.resolve(__dirname, 'app/index.html'),
      },
    },
  },

  // Copy everything from /public to /dist (splash, favicon, etc.)
  publicDir: path.resolve(__dirname, 'public'),

  // Setup path alias for cleaner imports
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./app/src"),
    },
  },
})
