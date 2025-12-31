import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  base: '/orle-website/',
  plugins: [react()],
  build: {
    outDir: 'build'
  }
})
