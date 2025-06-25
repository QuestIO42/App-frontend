import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'
import path from 'path'

export default defineConfig({
  server: {
    port: 3000,
    host: true,
    allowedHosts: ['front.vlab.dc.ufscar.br',
                  'dev.vlab.dc.ufscar.br',
                  'questio.vlab.dc.ufscar.br',
                  import.meta.env.DJANGO_SIMPLE_URL,
                  import.meta.env.FRONTEND_SIMPLE_URL,],
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
