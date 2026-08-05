import { copyFileSync, cpSync, existsSync, mkdirSync, readdirSync, rmSync } from 'node:fs'
import { resolve } from 'node:path'

const root = resolve('.')
const dist = resolve(root, 'dist')

if (!existsSync(resolve(dist, 'index.html'))) {
  console.error('dist/index.html not found. Run vite build first.')
  process.exit(1)
}

const assetsOut = resolve(root, 'assets')
if (existsSync(assetsOut)) {
  rmSync(assetsOut, { recursive: true, force: true })
}
mkdirSync(assetsOut, { recursive: true })
cpSync(resolve(dist, 'assets'), assetsOut, { recursive: true })

copyFileSync(resolve(dist, 'index.html'), resolve(root, 'index.html'))
copyFileSync(resolve(dist, '404.html'), resolve(root, '404.html'))

const faviconSrc = resolve(dist, 'favicon.svg')
if (existsSync(faviconSrc)) {
  copyFileSync(faviconSrc, resolve(root, 'favicon.svg'))
}

const nojekyllSrc = resolve(dist, '.nojekyll')
if (existsSync(nojekyllSrc)) {
  copyFileSync(nojekyllSrc, resolve(root, '.nojekyll'))
} else {
  copyFileSync(resolve(root, 'public', '.nojekyll'), resolve(root, '.nojekyll'))
}

console.log('Synced production build to repo root for GitHub Pages (main /)')
console.log('Root assets:', readdirSync(assetsOut).join(', '))
