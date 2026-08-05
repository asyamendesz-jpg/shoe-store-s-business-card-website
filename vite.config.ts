import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// GitHub Pages: https://<user>.github.io/shoe-store-s-business-card-website/
const githubPagesBase = '/shoe-store-s-business-card-website/'

export default defineConfig(({ command }) => ({
  plugins: [react()],
  // В dev — "/", в production-сборке — путь репозитория на GitHub Pages
  base: command === 'build' ? githubPagesBase : '/',
}))
