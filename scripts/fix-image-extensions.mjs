import { copyFileSync, existsSync, mkdirSync, readdirSync, readFileSync, renameSync, unlinkSync, writeFileSync } from 'node:fs'
import { join, resolve } from 'node:path'

const dirs = ['public/images', 'images', 'dist/images'].map((d) => resolve(d))

function isPng(buf) {
  return buf.length >= 4 && buf[0] === 0x89 && buf[1] === 0x50 && buf[2] === 0x4e && buf[3] === 0x47
}

for (const dir of dirs) {
  if (!existsSync(dir)) continue
  for (const file of readdirSync(dir)) {
    if (!file.endsWith('.jpg')) continue
    const src = join(dir, file)
    const buf = readFileSync(src)
    if (!isPng(buf)) continue
    const destName = file.replace(/\.jpg$/i, '.png')
    const dest = join(dir, destName)
    writeFileSync(dest, buf)
    unlinkSync(src)
    console.log('fixed', dir.split(/[/\\]/).slice(-2).join('/'), file, '->', destName)
  }
}
