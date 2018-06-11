"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
// @ts-ignore
const root = document.getElementById('root');
const ANIMATION_TIME = 100;
const ANIMATION_SETTLE = 50;
let style = document.createElement('style');
style.innerHTML = `
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
}`;
document.head.appendChild(style);
const Animated = ({ children = 'text', tag = 'span', cb }) => {
    return React.createElement(AnimateOnChange, { baseClassName: 'base', animationClassName: 'fade', animate: true, customTag: tag, onAnimationEnd: cb }, children);
};
class UpdatingProps extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            text: 'initial text'
        };
        setTimeout(() => {
            this.setState({ text: 'updated text' });
        }, ANIMATION_TIME + 2 * ANIMATION_SETTLE);
    }
    render() {
        return React.createElement(AnimateOnChange, { baseClassName: 'base', animationClassName: 'fade', animate: true }, this.state.text);
    }
}
function resetDOM() {
    ReactDOM.render(React.createElement("div", null), root);
    return new Promise(r => setTimeout(r, ANIMATION_SETTLE));
}
tape('it should render to dom', t => {
    ReactDOM.render(React.createElement(Animated, null), root);
    setTimeout(() => {
        t.assert(root.children.length == 1, 'did not render to dom');
        let tag = root.children[0].tagName;
        t.assert(tag == 'SPAN', `custom tag 'div' not rendered, got ${tag}`);
        t.end();
    }, 10);
});
tape('animation class name is added on enter', (t) => __awaiter(this, void 0, void 0, function* () {
    yield resetDOM();
    ReactDOM.render(React.createElement(Animated, null), root, () => {
        let animated = document.getElementsByClassName('fade');
        t.assert(animated.length == 1, 'animation class not added');
        t.end();
    });
}));
tape('removes animation class', (t) => __awaiter(this, void 0, void 0, function* () {
    yield resetDOM();
    ReactDOM.render(React.createElement(Animated, null), root);
    setTimeout(function () {
        let animated = document.getElementsByClassName('fade');
        t.assert(animated.length == 0, 'animation class not removed');
        t.end();
    }, ANIMATION_TIME + ANIMATION_SETTLE);
}));
tape('adds animation class on props change', (t) => __awaiter(this, void 0, void 0, function* () {
    yield resetDOM();
    ReactDOM.render(React.createElement(UpdatingProps, null), root);
    setTimeout(function () {
        let animated = document.getElementsByClassName('fade');
        t.assert(animated.length == 0, 'animation class not removed');
    }, ANIMATION_TIME + ANIMATION_SETTLE);
    setTimeout(function () {
        let animated = document.getElementsByClassName('fade');
        t.equal(animated.length, 1);
        t.equal(animated[0].textContent, 'updated text');
        t.end();
    }, ANIMATION_TIME + 2 * ANIMATION_SETTLE + 0.5 * ANIMATION_TIME);
}));
tape('define custom tag', (t) => __awaiter(this, void 0, void 0, function* () {
    yield resetDOM();
    ReactDOM.render(React.createElement(Animated, { tag: 'div' }), root, () => {
        let tag = root.children[0].tagName;
        t.assert(tag == 'DIV', `custom tag 'div' not rendered, got ${tag}`);
        t.end();
    });
}));
tape('calls back when animation complete', (t) => __awaiter(this, void 0, void 0, function* () {
    yield resetDOM();
    t.timeoutAfter(ANIMATION_TIME + ANIMATION_SETTLE);
    function mycallback() {
        t.pass();
        t.end();
    }
    ReactDOM.render(React.createElement(Animated, { cb: mycallback }), root);
}));
