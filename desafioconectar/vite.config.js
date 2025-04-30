import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  server: {
    proxy: {
      '/api-ibge': {
        target: 'https://servicodados.ibge.gov.br',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api-ibge/, ''),
      },
    },
  }
})