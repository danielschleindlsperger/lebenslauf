import puppeteer from 'puppeteer'
import * as fs from 'fs'
import * as path from 'path'

const OUTPUT_DIR = path.resolve(__dirname, '../out')
const OUTPUT = path.resolve(OUTPUT_DIR, 'lebenslauf-daniel-schleindlsperger.pdf')

if (!fs.existsSync(OUTPUT_DIR)) {
  fs.mkdirSync(OUTPUT_DIR)
}

export async function main() {
  const browser = await puppeteer.launch()
  const page = await browser.newPage()

  await page.goto('http://localhost:1234', {
    waitUntil: 'networkidle0',
  })
  await page.pdf({
    path: OUTPUT,
    format: 'A4',
    printBackground: true,
  })

  await browser.close()
}

process.on('unhandledRejection', (error) => {
  throw error
})

main()
