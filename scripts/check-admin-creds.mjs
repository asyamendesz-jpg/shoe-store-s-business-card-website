const base = 'https://asyamendesz-jpg.github.io/shoe-store-s-business-card-website'
const html = await (await fetch(`${base}/`)).text()
const jsPath = html.match(/src="([^"]+\.js)"/)?.[1]
console.log('js', jsPath)
const js = await (await fetch(`https://asyamendesz-jpg.github.io${jsPath}`)).text()
console.log('has admin@aduard.com', js.includes('admin@aduard.com'))
console.log('has old admin login string', /adminLogin:"admin"/.test(js) || js.includes('adminLogin:"admin"'))
console.log('has forma2024', js.includes('forma2024'))
const idx = js.indexOf('aduard')
console.log('aduard idx', idx, idx >= 0 ? js.slice(idx - 40, idx + 60) : '')
const idx2 = js.indexOf('forma2024')
console.log('pass vicinity', js.slice(idx2 - 50, idx2 + 30))
