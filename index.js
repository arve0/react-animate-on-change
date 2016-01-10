import React, { Component } from 'react'

/**
 * # AnimateOnChange component.
 * Adds `animationClassName` when `animate` is true, then removes
 * `animationClassName` when animation is done (event `animationend` is
 * triggered).
 *
 * @prop {string} baseClassName - Base class name.
 * @prop {string} animationClassName - Class added when `animate == true`.
 * @prop {bool} animate - Wheter to animate component.
 */
class AnimateOnChange extends Component {
  constructor (props) {
    super(props)
    this.state = { animating: false, clearAnimationClass: false }
    this.animationStart = this.animationStart.bind(this)
    this.animationEnd = this.animationEnd.bind(this)
  }

  componentDidMount () {
    const elm = this.refs.root
    elm.addEventListener('animationstart', this.animationStart)
    elm.addEventListener('animationend', this.animationEnd)
  }

  componentWillUnmount () {
    const elm = this.refs.root
    elm.removeEventListener('animationstart', this.animationStart)
    elm.removeEventListener('animationend', this.animationEnd)
  }

  animationStart () {
    this.setState({ animating: true, clearAnimationClass: false })
  }

  animationEnd () {
    // send separate, animation state change will not render
    this.setState({ clearAnimationClass: true })  // renders
    this.setState({ animating: false, clearAnimationClass: false })
  }

  shouldComponentUpdate (nextProps, nextState) {
    if (this.state.animating !== nextState.animating) {
      // do not render on animation change
      return false
    }
    return true
  }

  render () {
    let className = this.props.baseClassName

    if (this.props.animate && !this.state.clearAnimationClass) {
      className += ` ${this.props.animationClassName}`
    }

    return <span ref='root' className={className}>
      {this.props.children}
    </span>
  }
}

AnimateOnChange.propTypes = {
  children: React.PropTypes.element.isRequired,
  animate: React.PropTypes.bool.isRequired,
  baseClassName: React.PropTypes.string.isRequired,
  animationClassName: React.PropTypes.string.isRequired
}

export default AnimateOnChange
