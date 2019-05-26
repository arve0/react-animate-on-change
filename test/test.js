const server = require('./server')
const configuration = require('../package.json')
const puppeteer = configuration.devDependencies.puppeteer
    ? require('puppeteer')
    : require('puppeteer-firefox');
const path = require('path')
const assert = require('assert')

// configuration
const rootPath = path.join(__dirname, '..')  // which folder to serve over http
const port = 8888  // which port to use for http server
const mainPage = `http://localhost:${port}/test/index.html`
const headless = true  // false: show browser, true: hide browser
const slowMo = false  // true: each browser action will take 100 milliseconds
    ? 100
    : 0

const ANIMATION_TIME = slowMo ? 1000 : 100
const ANIMATION_SETTLE = slowMo ? 500 : 50
const STYLE = `
    #root {
        margin-top: 50vh;
        margin-left: 50vw;
    }
    .base {
        background-color: black;
        color: white;
        border-radius: 3px;
        padding: 5px;
        width: 100px;
    }
    .fade {
        animation-name: fade-in;
        animation-duration: ${ANIMATION_TIME}ms;
    }
        @keyframes fade-in {
        0% { opacity: 0; }
        100% { opacity: 1; }
    }`

// globals
let browser = null
let page = null

before(async function () {
    this.timeout(30 * 1000) // starting browser may take more than 2 seconds

    await server.start(rootPath, port)
    browser = await puppeteer.launch({ headless, slowMo })
    page = (await browser.pages())[0]

    page.on('console', async function (msg) {
        if (msg.type() === 'error' && msg.args().length) {
            let args = await Promise.all(msg.args().map(arg => arg.jsonValue()))
            console.error("Browser console.error:", ...args)
        } else {
            console.log(msg.text())
        }
    })
})

beforeEach(async function () {
    await page.goto(mainPage)
    await page.addStyleTag({ content: STYLE })
    await page.evaluate(setup)
})

after(function () {
    browser.close()
    server.shutdown()
})

describe('tests', function () {
    this.timeout(slowMo === 0 ? 2000 : 0)

    it('should render to dom', async () => {
        await page.evaluate(renderAnimated)
        await page.waitFor(10)
        const children = await page.evaluate(() => root.children.length)
        assert.equal(children, 1, 'no children in root')
        const tag = await page.evaluate(() => root.children[0].tagName)
        assert.equal(tag, 'SPAN', `custom tag 'span' not rendered, got ${tag}`)
    })

    it('animation class name is added on enter', async () => {
        await page.evaluate(renderAnimated)
        await page.waitFor(10)
        const fadeElement = await page.$('.fade')
        assert.notDeepStrictEqual(fadeElement, null, 'animation class not added')
    })

    it('removes animation class', async () => {
        await page.evaluate(renderAnimated)
        await page.waitFor(ANIMATION_TIME + ANIMATION_SETTLE)
        const fadeElement = await page.$('.fade')
        assert.deepStrictEqual(fadeElement, null, 'animation class not removed')
    })

    it('adds animation class on props change', async () => {
        await page.evaluate(renderUpdateProps, ANIMATION_TIME, ANIMATION_SETTLE)

        await page.waitFor(ANIMATION_TIME + ANIMATION_SETTLE)
        let fadeElement = await page.$('.fade')
        assert.deepStrictEqual(fadeElement, null, 'animation class not removed')

        await page.waitFor(ANIMATION_SETTLE + 0.5 * ANIMATION_TIME)
        const textContent = await page.$eval('.fade', element => element.textContent)
        assert.equal(textContent, 'updated text')
    })

    it('define custom tag', async () => {
        await page.evaluate(renderAnimated, { tag: 'div' })
        const tag = await page.$eval('#root', root => root.children[0].tagName)
        assert.equal(tag, 'DIV', `custom tag 'div' not rendered, got ${tag}`)
    })

    it('calls back when animation complete', async () => {
        await page.evaluate(renderAnimated, { cb: true })
        await page.waitFor(ANIMATION_TIME + ANIMATION_SETTLE)
        const callCount = await page.$eval('#root', root => root.callCount)
        assert.equal(callCount, 1)
    })

    it('should support other props', async () => {
        await page.evaluate(renderAnimated, { someProp: 'asdf' })
        const someProp = await page.$eval('.base', base => base.getAttribute('someProp'))
        assert.equal(someProp, 'asdf', 'attribute someProp not rendered to dom')
    })
})

function setup() {
    window.root = document.getElementById('root')

    window.Animated = ({ children = 'text', tag = 'span', cb, ...rest }) =>
        React.createElement(AnimateOnChange, Object.assign({
            baseClassName: "base",
            animationClassName: "fade",
            animate: true,
            customTag: tag,
            onAnimationEnd: cb
        }, rest), children)

    class UpdatePropsAfterAnimationTimePlus2xAnimationSettle extends React.Component {
        constructor(props) {
            super(props)
            this.state = {
                text: 'initial text'
            }
            setTimeout(() => {
                this.setState({ text: 'updated text' })
            }, props.ANIMATION_TIME + 2 * props.ANIMATION_SETTLE)
        }
        render() {
            return React.createElement(AnimateOnChange, {
                baseClassName: "base",
                animationClassName: "fade",
                animate: true,
            }, this.state.text)
        }
    }
    window.UpdatePropsAfterAnimationTimePlus2xAnimationSettle = UpdatePropsAfterAnimationTimePlus2xAnimationSettle
}

function renderAnimated(props) {
    if (props && props.cb) {
        props.cb = () => {
            if (!root.callCount) { root.callCount = 0 }
            root.callCount += 1
        }
    }
    ReactDOM.render(React.createElement(Animated, props), root)
}

// AnimateOnChange with prop change after ANIMATION_TIME + 2 * ANIMATION_SETTLE
function renderUpdateProps(ANIMATION_TIME, ANIMATION_SETTLE) {
    ReactDOM.render(React.createElement(UpdatePropsAfterAnimationTimePlus2xAnimationSettle, {
        ANIMATION_TIME, ANIMATION_SETTLE
    }), root)
}
