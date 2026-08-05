import { copyFileSync, existsSync } from 'node:fs'
import { resolve } from 'node:path'

const outDir = resolve(process.argv[2] || 'dist')
const indexHtml = resolve(outDir, 'index.html')
const notFoundHtml = resolve(outDir, '404.html')

if (!existsSync(indexHtml)) {
  console.error(`${outDir}/index.html not found. Run vite build first.`)
  process.exit(1)
}

copyFileSync(indexHtml, notFoundHtml)
console.log(`Created ${outDir}/404.html for GitHub Pages SPA routing`)
