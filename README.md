# react-animate-on-change

[![](https://saucelabs.com/browser-matrix/arve0.svg)](https://saucelabs.com/u/arve0)

Animate your react components on props or state changes, in contrast to [entries added/removed from arrays](https://facebook.github.io/react/docs/animation.html).

<img src="demo.gif" width="300">

## Install
```sh
npm install react-animate-on-change react
```

## Usage
```js
const AnimateOnChange = require('react-animate-on-change')

// functional component
const Score = (props) =>
  <AnimateOnChange
    baseClassName="Score"
    animationClassName="Score--bounce"
    animate={props.diff != 0}>
      Score: {props.score}
  </AnimateOnChange>
```

The example above will (roughly) render to:

**On enter or changes in `props.diff` or `props.score`:**
```html
<span class="Score Score--bounce">
  <span>Score: 100</span>
</span>
```

**On animation end:**
```html
<span class="Score">
  <span>Score: 100</span>
</span>
```

Also, [see the example folder](example).

## Props
`baseClassName {string}` : Base class name that be added to the component.

`animationClassName {string}` : Animation class name. Added when `animate == true`. Removed when the event [`animationend`](http://www.w3.org/TR/css3-animations/#animationend) is triggered.

`animate {bool}` : Wheter component should animate.

## Develop
```sh
npm start
```
Add tests in [test.js](test.js) and hack away.

## Known issues
- The browser must support CSS3 animations, doh.
