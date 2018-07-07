# react-animate-on-change

[![Build Status](https://travis-ci.org/arve0/react-animate-on-change.svg?branch=master)](https://travis-ci.org/arve0/react-animate-on-change)

Animate your react components on props or state changes, in contrast to [entries added/removed from arrays](https://facebook.github.io/react/docs/animation.html).

<img src="demo.gif" width="300">

## Install
```sh
npm install react-animate-on-change react
```

## Usage
```js
import AnimateOnChange from 'react-animate-on-change'
// CommonJS:
// const AnimateOnChange = require('react-animate-on-change').default

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

`animate {bool}` : Whether component should animate.

`customTag {string}` : HTML tag of the component.

`onAnimationEnd {() => void)}` : Callback which is called when animation ends.

## Develop
Setup:
```sh
npm install
cd test
npm install
cd ..
```

Add tests in [test/client-tests.js](client-tests.js), start tests with:
```
npm test
```

Build and view example:
```
npm run build-example
open example/index.html
```

## Known issues
- The browser must support CSS3 animations.
