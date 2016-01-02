# react-animate-on-change

Animate your react components on state change, in contrast to [entering/leaving entries in arrays](https://facebook.github.io/react/docs/animation.html).

<img src="demo.gif" width="300">

## Install
```sh
npm install react-animate-on-change react
```

## Usage
```js
const AnimateOnChage = require('animate-on-change')

// functional component
const MyComponent = (props) => {
  <AnimateOnChange
    baseClassName="Score"
    animationClassName="Score--bounce"
    animate={props.diff != 0}>
      Score: {props.score}
  </AnimateOnChange>
}
```

## Options
`baseClassName`
`animationClassName`
`animate`

## Develop
```sh
npm run start
```
