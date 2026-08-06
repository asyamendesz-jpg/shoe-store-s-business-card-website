import { copyFileSync, existsSync, mkdirSync } from 'node:fs'
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

/** Физические index.html для клиентских маршрутов — без этого /admin и /cart дают пустой 404 на Pages. */
const spaRoutes = ['admin', 'cart', 'privacy', 'offer']
for (const route of spaRoutes) {
  const dir = resolve(outDir, route)
  mkdirSync(dir, { recursive: true })
  copyFileSync(indexHtml, resolve(dir, 'index.html'))
  console.log(`Created ${route}/index.html`)
}
