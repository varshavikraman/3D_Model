import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss(),],
  server: {
    port:3535,
    proxy:{
      '/api': {
        target: 'http://localhost:8585',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, ''),
      }
    }

  }
})
