import * as fs from 'fs'
import * as path from 'path'
import { createServer } from 'http'
import puppeteer from 'puppeteer'
import handler from 'serve-handler'
import getPort from 'get-port'

const OUTPUT_DIR = path.resolve(__dirname, '../out')
const OUTPUT = path.resolve(OUTPUT_DIR, 'lebenslauf-daniel-schleindlsperger.pdf')

if (!fs.existsSync(OUTPUT_DIR)) {
  fs.mkdirSync(OUTPUT_DIR)
}

async function main() {
  const browser = await puppeteer.launch()
  const page = await browser.newPage()
  const port = await getPort({ port: getPort.makeRange(3000, 3100) })
  const closeServer = await serve({ port })

  await page.goto(`http://localhost:${port}`, {
    waitUntil: 'networkidle0',
  })
  await page.pdf({
    path: OUTPUT,
    format: 'A4',
    printBackground: true,
  })

  console.log('\nSuccessfully exported Lebenslauf to PDF!\n')

  await browser.close()
  await closeServer()
}

async function serve({ port }: { port: number }): Promise<() => Promise<void>> {
  const server = createServer((request, response) => {
    return handler(request, response, { public: path.resolve(__dirname, '../dist') })
  })

  // wait for server to start listening
  await new Promise((resolve) => {
    server.listen(port, resolve)
  })

  const closeServer = async () => {
    await new Promise((resolve) => {
      server.close(resolve)
    })
  }

  return closeServer
}

process.on('unhandledRejection', (error) => {
  throw error
})

main()
