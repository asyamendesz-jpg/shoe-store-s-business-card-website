import { copyFileSync, cpSync, existsSync, mkdirSync, rmSync } from 'node:fs'
import { resolve } from 'node:path'

const root = resolve('.')
const source = resolve(root, 'index.vite.html')
const target = resolve(root, 'index.html')

if (!existsSync(source)) {
  console.error('index.vite.html not found')
  process.exit(1)
}

copyFileSync(source, target)
console.log('Restored index.html for Vite (from index.vite.html)')
