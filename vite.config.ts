import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  // Относительные пути — надёжно работают на GitHub Pages в подпапке репозитория
  base: './',
})
