
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'
import { componentTagger } from "lovable-tagger";

export default defineConfig({
  plugins: [
    react({
      jsxRuntime: 'automatic'
    }),
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
  esbuild: false,
  build: {
    target: 'es2015',
    minify: 'terser',
    rollupOptions: {
      output: {
        format: 'es'
      },
    },
  },
  define: {
    global: 'globalThis',
  },
  optimizeDeps: {
    esbuildOptions: {
      target: 'es2015'
    }
  }
})
