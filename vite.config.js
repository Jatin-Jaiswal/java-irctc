
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'
import { componentTagger } from "lovable-tagger";

export default defineConfig(({ mode }) => ({
  plugins: [
    react({
      babel: {
        presets: [
          ['@babel/preset-env', { targets: { node: 'current' } }],
          ['@babel/preset-react', { runtime: 'automatic' }],
          '@babel/preset-typescript'
        ],
        plugins: []
      }
    }),
    mode === 'development' && componentTagger(),
  ].filter(Boolean),
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
    minify: false,
    rollupOptions: {
      external: [],
      output: {
        manualChunks: undefined,
        format: 'es'
      },
    },
    commonjsOptions: {
      transformMixedEsModules: true,
    },
    cssCodeSplit: false,
    sourcemap: false,
    chunkSizeWarningLimit: 1000
  },
  optimizeDeps: {
    disabled: true,
    force: true,
    include: [],
    exclude: ['@esbuild/linux-x64']
  },
  define: {
    global: 'globalThis',
  },
  css: {
    transformer: 'postcss'
  }
}))
