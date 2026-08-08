import { chromium } from 'playwright'

const base = 'https://asyamendesz-jpg.github.io/shoe-store-s-business-card-website'

const browser = await chromium.launch()
const page = await browser.newPage()
await page.goto(`${base}/admin/`, { waitUntil: 'networkidle', timeout: 90000 })
await page.waitForTimeout(1500)

const before = await page.locator('h1').first().textContent()
console.log('before h1:', before)

await page.locator('input[name="username"]').fill('admin@aduard.com')
await page.locator('input[name="password"]').fill('forma2024')
await page.locator('button[type="submit"]').click()
await page.waitForTimeout(1000)

const after = await page.locator('h1').first().textContent()
const error = await page.locator('.admin-login__error').textContent().catch(() => null)
console.log('after h1:', after)
console.log('error:', error)
console.log('authed?', await page.evaluate(() => sessionStorage.getItem('forma_admin')))

await page.screenshot({ path: 'tmp-admin-login.png' })
await browser.close()
