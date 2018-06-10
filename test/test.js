const { start, shutdown } = require('./server')
const { launch } = require('puppeteer')

const options = process.env.TRAVIS
    ? { args: ['--no-sandbox'] }
    : { headless: false }

launch(options).then(async (browser) => {
    await start()
    let page = await browser.newPage()

    page.on('console', (msg) => {
        if (msg._type === 'error') {
            console.error(msg._text)
        } else {
            console.log(msg._text)
        }
    })

    await page.goto('http://localhost:8888/client-tests.html')

    // wait for console output from browser before closing
    await page.evaluate(() => {
        return new Promise((resolve, reject) => {
            tape.onFinish(resolve)
        })
    })

    browser.close()
    shutdown()
})