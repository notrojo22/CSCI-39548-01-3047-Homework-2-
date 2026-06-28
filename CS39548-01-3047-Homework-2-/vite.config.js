import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  // GitHub Pages configuration
  // https://notrojo22.github.io/CSCI-39548-01-3047-Homework-2-/
  base: '/CSCI-39548-01-3047-Homework-2-/',
})
