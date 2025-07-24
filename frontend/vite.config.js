import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import { resolve } from 'path'
import { copyFileSync } from 'fs'

// Custom plugin to copy _redirects manually
const copyRedirects = () => ({
  name: 'copy-redirects',
  closeBundle: () => {
    copyFileSync(resolve(__dirname, 'public/_redirects'), resolve(__dirname, 'dist/_redirects'))
  }
})

export default defineConfig({
  plugins: [react(), tailwindcss(), copyRedirects()],
})
