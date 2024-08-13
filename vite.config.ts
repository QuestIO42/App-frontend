import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'
import path from 'path'

export default defineConfig({
  server: {
    port: 3000,
    host: '0.0.0.0', // Ou seu hostname local
    hmr: {
      host: 'react.vlab.dc.ufscar.br',
      port: 443,
      protocol: 'wss', // WebSocket Secure
    },
    proxy: {
      '/api': 'http://localhost:3000',
    },
  },
  plugins: [react()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
})
