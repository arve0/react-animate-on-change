import React, { Component } from 'react'


/**
 * # AnimateOnChange component.
 * Adds `animationClassName` when `animate` is true, then removes
 * `animationClassName` when animation is done (event `animationend` is
 * triggered).
 *
 * @prop {string} className - Base class name.
 * @prop {string} animationClassName - Class added when `animate == true`.
 * @prop {bool} animate - Wheter to animate component.
 */
class AnimateOnChange extends Component {
  constructor(props) {
    super(props)
    this.state = { animating: false, clearAnimationClass: false }
  }

  componentDidMount() {
    this.refs.root.addEventListener('animationstart', () => {
      this.setState({ animating: true, clearAnimationClass: false })
    })
    this.refs.root.addEventListener('animationend', () => {
      // send separate, animation state change will not render
      this.setState({ clearAnimationClass: true })  // renders
      this.setState({ animating: false, clearAnimationClass: false })
    })
  }

  shouldComponentUpdate(nextProps, nextState) {
    if (this.state.animating != nextState.animating){
      // do not render on animation change
      return false
    }
    return true
  }

  render() {
    let className = this.props.className

    if (this.props.animate && !this.state.clearAnimationClass) {
      className += ` ${this.props.animationClassName}`
    }

    return <span ref="root" className={className}>
      {this.props.children}
    </span>
  }
}


export default AnimateOnChange
