import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    port: 3000, // Lock it to port 3000
    strictPort: true, // If 3000 is busy, fail instead of changing to 3001
  }
})
