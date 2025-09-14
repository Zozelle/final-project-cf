import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
    server: {
        proxy: {
            '/auth': 'http://localhost:3000',
            '/cats': 'http://localhost:3000',
            '/reservations': 'http://localhost:3000',
            '/users': 'http://localhost:3000',
        },
    },
})
