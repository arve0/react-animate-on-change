# react-animate-on-change

Animate your react components on state changes, in contrast to [entering/leaving entries in arrays](https://facebook.github.io/react/docs/animation.html).

<img src="demo.gif" width="300">

## Install
```sh
npm install react-animate-on-change react
```

## Usage
```js
const AnimateOnChage = require('animate-on-change')

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

## Props
`baseClassName {string}` : Base class name that be added to the component.

`animationClassName {string}` : Animation class name. Added when `animate == true`. Removed when the event [`animationend`](http://www.w3.org/TR/css3-animations/#animationend) is triggered.

`animate {bool}` : Wheter component should animate.

## Develop
```sh
npm run start
```

## Known issues
If the event `animationend` does not trigger, `animationClassName` will not be removed. This is the case in browsers without support for CSS animations, or if the CSS (either `baseClassName` or `animationClassName`) does not declare an animation.
