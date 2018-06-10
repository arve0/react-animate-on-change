// @ts-ignore
const root: HTMLElement = document.getElementById('root')

const ANIMATION_TIME = 100
const ANIMATION_SETTLE = 500

let style = document.createElement('style')
style.innerHTML = `
.base {
  background-color: black;
  color: white;
  border-radius: 3px;
  padding: 5px;
  width: 100px;
}
.fade {
  -webkit-animation-name: fade-in;
  -webkit-animation-duration: ${ANIMATION_TIME}ms;
  animation-name: fade-in;
  animation-duration: ${ANIMATION_TIME}ms;
}
@keyframes fade-in {
  from {opacity: 1;}
  to {opacity: 0;}
}`
document.head.appendChild(style)

const Animated = ({ children = 'text', tag = 'span' }) => {
    return <AnimateOnChange
        baseClassName='base'
        animationClassName='fade'
        animate={true}
        customTag={tag}>
        {children}
    </AnimateOnChange>
}

class UpdatingProps extends React.Component<{}, { text: string }> {
    constructor(props: {}) {
        super(props)
        this.state = {
            text: 'initial text'
        }
        setTimeout(() => {
            this.setState({ text: 'updated text' })
        }, ANIMATION_TIME + 2 * ANIMATION_SETTLE)
    }
    render() {
        return <AnimateOnChange
            baseClassName='base'
            animationClassName='fade'
            animate={true}>
            {this.state.text}
        </AnimateOnChange>
    }
}


tape('it should render to dom', t => {
    ReactDOM.render(<Animated />, root, () => {
        t.assert(root.children.length == 1, 'did not render to dom')
        let tag = root.children[0].tagName
        t.assert(tag == 'SPAN', `custom tag 'div' not rendered, got ${tag}`)
        t.end()
    })
})

tape('animation class name is added on enter', t => {
    ReactDOM.render(<Animated />, root, () => {
        let animated = document.getElementsByClassName('fade')
        t.assert(animated.length == 1, 'animation class not added')
        t.end()
    })
})

tape('removes animation class', t => {
    ReactDOM.render(<Animated />, root)
    setTimeout(function () {
        let animated = document.getElementsByClassName('fade')
        t.assert(animated.length == 0, 'animation class not removed')
        t.end()
    }, ANIMATION_TIME + ANIMATION_SETTLE)
})

tape('adds animation class on props change', t => {
    ReactDOM.render(<UpdatingProps />, root)

    setTimeout(function () {
        let animated = document.getElementsByClassName('fade')
        t.assert(animated.length == 0, 'animation class not removed')
    }, ANIMATION_TIME + ANIMATION_SETTLE)

    setTimeout(function () {
        let animated = document.getElementsByClassName('fade')
        t.equal(animated.length, 1)
        t.equal(animated[0].textContent, 'updated text')
        t.end()
    }, ANIMATION_TIME + 2 * ANIMATION_SETTLE + 0.5 * ANIMATION_TIME)
})

tape('define custom tag', t => {
    ReactDOM.render(<Animated tag='div' />, root, () => {
        let tag = root.children[0].tagName
        t.assert(tag == 'DIV', `custom tag 'div' not rendered, got ${tag}`)
        t.end()
    })
})
