
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'

export default defineConfig({
  plugins: [react({
    jsxRuntime: 'automatic',
    babel: {
      plugins: [],
      presets: [
        ['@babel/preset-env', { targets: { node: 'current' } }],
        ['@babel/preset-react', { runtime: 'automatic' }]
      ]
    }
  })],
  server: {
    port: 8080
  },
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  esbuild: false,
  build: {
    target: 'es2015',
    minify: false,
    rollupOptions: {
      external: [],
    },
  },
  optimizeDeps: {
    disabled: true
  },
  define: {
    global: 'globalThis',
  }
})
