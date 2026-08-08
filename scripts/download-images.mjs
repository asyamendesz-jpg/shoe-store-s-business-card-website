import { copyFileSync, existsSync, mkdirSync, writeFileSync } from 'node:fs'
import { resolve } from 'node:path'

const outDir = resolve('public/images')
mkdirSync(outDir, { recursive: true })

const generatedDir = resolve(process.env.USERPROFILE || '', '.cursor/projects/c-Users-Desktop/assets')

const generated = [
  'hero.jpg',
  'women.jpg',
  'boots.jpg',
  'kids.jpg',
  'sneakers.jpg',
  'casual.jpg',
]

for (const file of generated) {
  const src = resolve(generatedDir, file)
  if (!existsSync(src)) {
    console.log('NOGEN', file)
    continue
  }
  copyFileSync(src, resolve(outDir, file))
  console.log('COPY', file)
}

const wiki = [
  ['men.jpg', 'Desert_boots.jpg'],
  ['men-sneakers.jpg', 'Adidas_Ultra_Boost_4_running_shoes.jpeg'],
  ['trend1.jpg', 'Adidas_Ultra_Boost_4_running_shoes.jpeg'],
  ['trend2.jpg', 'Desert_boots.jpg'],
  ['trend3.jpg', 'Adidas_Ultra_Boost_4_running_shoes.jpeg'],
  ['sustainable.jpg', 'Adidas_Ultra_Boost_4_running_shoes.jpeg'],
  ['cta.jpg', 'Desert_boots.jpg'],
  ['review1.jpg', 'Adidas_Ultra_Boost_4_running_shoes.jpeg'],
  ['review2.jpg', 'Desert_boots.jpg'],
  ['review3.jpg', 'Adidas_Ultra_Boost_4_running_shoes.jpeg'],
  ['review4.jpg', 'Desert_boots.jpg'],
]

async function downloadWiki(file, wikiName) {
  const dest = resolve(outDir, file)
  if (existsSync(dest)) {
    console.log('SKIP', file)
    return true
  }
  const url = `https://commons.wikimedia.org/wiki/Special:FilePath/${encodeURIComponent(wikiName)}?width=1000`
  const ctrl = new AbortController()
  const t = setTimeout(() => ctrl.abort(), 25000)
  try {
    const r = await fetch(url, {
      signal: ctrl.signal,
      redirect: 'follow',
      headers: { 'User-Agent': 'Mozilla/5.0 FORMABot/1.0' },
    })
    if (!r.ok) throw new Error(`HTTP ${r.status}`)
    const buf = Buffer.from(await r.arrayBuffer())
    if (buf.length < 1000) throw new Error(`small ${buf.length}`)
    writeFileSync(dest, buf)
    console.log('OK', file, buf.length)
    return true
  } catch (e) {
    console.log('FAIL', file, e.cause?.code || e.message)
    return false
  } finally {
    clearTimeout(t)
  }
}

for (const [file, name] of wiki) {
  await downloadWiki(file, name)
  await new Promise((r) => setTimeout(r, 800))
}

// Fallbacks: reuse local generated files when wiki failed
const fallbacks = {
  'men.jpg': 'boots.jpg',
  'men-sneakers.jpg': 'sneakers.jpg',
  'trend1.jpg': 'casual.jpg',
  'trend2.jpg': 'sneakers.jpg',
  'trend3.jpg': 'boots.jpg',
  'sustainable.jpg': 'hero.jpg',
  'cta.jpg': 'hero.jpg',
  'review1.jpg': 'women.jpg',
  'review2.jpg': 'sneakers.jpg',
  'review3.jpg': 'casual.jpg',
  'review4.jpg': 'boots.jpg',
}

for (const [file, from] of Object.entries(fallbacks)) {
  const dest = resolve(outDir, file)
  const src = resolve(outDir, from)
  if (!existsSync(dest) && existsSync(src)) {
    copyFileSync(src, dest)
    console.log('FALLBACK', file, '<-', from)
  }
}

console.log('Ready')
