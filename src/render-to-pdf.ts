import puppeteer from 'puppeteer'
import * as path from 'path'

const SUPPORTED_FILE_FORMATS = ['html', 'pdf'] as const

export async function main() {
  const puppeteerLaunchArgs = []

  if (process.env.RESUME_PUPPETEER_NO_SANDBOX) {
    puppeteerLaunchArgs.push('--no-sandbox')
  }

  const browser = await puppeteer.launch({
    args: puppeteerLaunchArgs,
  })
  const page = await browser.newPage()

  await page.goto('http://localhost:1234', {
    waitUntil: 'networkidle0',
  })
  await page.pdf({
    path: './lebenslauf.pdf',
    format: 'A4',
    printBackground: true,
  })

  await browser.close()
}

process.on('unhandledRejection', (error) => {
  throw error
})

main()
