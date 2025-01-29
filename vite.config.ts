import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'
import path from 'path'

export default defineConfig({
  server: {
    port: 3000,
    host: true,
    allowedHosts: ['front-django.vlab.dc.ufscar.br, front-fastify.vlab.dc.ufscar.br, front-spring.vlab.dc.ufscar.br'],
  },
  plugins: [react()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  build: {
    outDir: 'dist',
    sourcemap: true,
  },
})
