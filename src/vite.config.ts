import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'
import path from 'path'

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  // Allow importing JSON from data/ directory outside src/
  server: {
    fs: {
      allow: ['.', '..'],
    },
  },
})
