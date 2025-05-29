
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'
import { componentTagger } from "lovable-tagger";

export default defineConfig({
  plugins: [
    react(),
    componentTagger(),
  ],
  server: {
    host: "::",
    port: 8080,
  },
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  build: {
    target: 'esnext',
    minify: false,
    rollupOptions: {
      output: {
        format: 'es'
      },
    },
  },
  define: {
    global: 'globalThis',
  }
})
