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

export interface Props {
  children: any,
  animate: boolean,
  baseClassName: string,
  animationClassName: string,
  customTag?: string,
  onAnimationEnd?: () => void,
}

export interface State {
  animating: boolean,
  clearAnimationClass: boolean
}

interface AnimateOnChange {
  elm: HTMLElement,
  setElementRef: (ref: HTMLElement) => void
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
class AnimateOnChange extends Component<Props, State> implements AnimateOnChange {
  constructor (props: Props) {
    super(props)
    this.state = { animating: false, clearAnimationClass: false }
    this.animationStart = this.animationStart.bind(this)
    this.animationEnd = this.animationEnd.bind(this)

    this.setElementRef = (ref) => {
      this.elm = ref
    }
  }

  componentDidMount () {
    this.addEventListener('start', this.elm, this.animationStart)
    this.addEventListener('end', this.elm, this.animationEnd)
  }

  componentWillUnmount () {
    this.removeEventListeners('start', this.elm, this.animationStart)
    this.removeEventListeners('end', this.elm, this.animationEnd)
  }

  addEventListener (type: string, elm: HTMLElement, eventHandler: (e: Event) => void) {
    // until an event has been triggered bind them all
    events[type].map(event => {
      // console.log(`adding ${event}`)
      // @ts-ignore
      elm.addEventListener(event, eventHandler)
    })
  }

  removeEventListeners (type: string, elm: HTMLElement, eventHandler: (e: Event) => void) {
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
      this.removeEventListeners('startRemoved', this.elm, this.animationStart)
    }
    this.setState({ animating: true, clearAnimationClass: false })
  }

  animationEnd (e: Event) {
    if (events['end'].length > 1) {
      this.updateEvents('end', e.type)
      this.removeEventListeners('endRemoved', this.elm, this.animationStart)
    }
    // send separate, animation state change will not render
    this.setState({ clearAnimationClass: true })  // renders
    this.setState({ animating: false, clearAnimationClass: false })

    if (typeof this.props.onAnimationEnd === 'function') {
      this.props.onAnimationEnd()
    }
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

    let Tag = this.props.customTag || 'span';

    return <Tag ref={this.setElementRef} className={className}>
      {this.props.children}
    </Tag>
  }
}

export default AnimateOnChange
