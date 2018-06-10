import React, { Component, ReactInstance } from 'react'

interface Events {
  [index:string]: string[]
}

const events: Events = {
  start: ['animationstart', 'webkitAnimationStart', 'mozAnimationStart', 'oanimationstart', 'MSAnimationStart'],
  end: ['animationend', 'webkitAnimationEnd', 'mozAnimationEnd', 'oanimationend', 'MSAnimationEnd'],
  startRemoved: [],
  endRemoved: []
}

interface Props {
  children: {},
  animate: boolean,
  baseClassName: string,
  animationClassName: string
}

interface State {
  animating: boolean,
  clearAnimationClass: boolean
}

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
class AnimateOnChange extends Component<Props, State> {
  constructor (props: Props) {
    super(props)
    this.state = { animating: false, clearAnimationClass: false }
    this.animationStart = this.animationStart.bind(this)
    this.animationEnd = this.animationEnd.bind(this)
  }

  componentDidMount () {
    const elm = this.refs.root
    this.addEventListener('start', elm, this.animationStart)
    this.addEventListener('end', elm, this.animationEnd)
  }

  componentWillUnmount () {
    const elm = this.refs.root
    this.removeEventListeners('start', elm, this.animationStart)
    this.removeEventListeners('end', elm, this.animationEnd)
  }

  addEventListener (type: string, elm: ReactInstance, eventHandler: (e: Event) => void) {
    // until an event has been triggered bind them all
    events[type].map(event => {
      // console.log(`adding ${event}`)
      // @ts-ignore
      elm.addEventListener(event, eventHandler)
    })
  }

  removeEventListeners (type: string, elm: ReactInstance, eventHandler: (e: Event) => void) {
    events[type].map(event => {
      // console.log(`removing ${event}`)
      // @ts-ignore
      elm.removeEventListener(event, eventHandler)
    })
  }

  updateEvents (type: string, newEvent: string) {
    // console.log(`updating ${type} event to ${newEvent}`)
    events[type + 'Removed'] = events[type].filter(e => e !== newEvent)
    events[type] = [newEvent]
  }

  animationStart (e: Event) {
    if (events['start'].length > 1) {
      this.updateEvents('start', e.type)
      this.removeEventListeners('startRemoved', this.refs.root, this.animationStart)
    }
    this.setState({ animating: true, clearAnimationClass: false })
  }

  animationEnd (e: Event) {
    if (events['end'].length > 1) {
      this.updateEvents('end', e.type)
      this.removeEventListeners('endRemoved', this.refs.root, this.animationStart)
    }
    // send separate, animation state change will not render
    this.setState({ clearAnimationClass: true })  // renders
    this.setState({ animating: false, clearAnimationClass: false })
  }

  shouldComponentUpdate (nextProps: Props, nextState: State) {
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

export default AnimateOnChange
