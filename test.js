/* eslint-env jasmine */

import React, { Component } from 'react'
import { render } from 'react-dom'
import AnimateOnChange from './index.js'

class PushNewProps extends Component {
  constructor (props) {
    super(props)
    this.state = {}
    this.state.text = 'content'
    setTimeout(function () {
      this.setState({text: 'new content'})
    }.bind(this), 200)
  }
  render () {
    return <AnimateOnChange
      baseClassName='base'
      animationClassName='animated'
      animate={true}>
        {this.state.text}
      </AnimateOnChange>
  }
}

describe('react-animate-on-change', function () {
  let root, children
  beforeEach(function () {
    document.head.innerHTML = `<style>
    .animated {
      animation: animation-keyframes 100ms;
    }
    @keyframes animation-keyframes {
      from: {opacity: 1}
      to: {opacity: 0.01}
    }
    </style>`
    document.body.innerHTML = '<div id="root"></div>'
    root = document.getElementById('root')
    children = () => <div>content</div>
    render(<AnimateOnChange
      baseClassName='base'
      animationClassName='animated'
      animate={true}>
        {children}
      </AnimateOnChange>, root)
  })

  it('renders to dom', function () {
    let elms = document.getElementsByClassName('base')
    expect(elms.length).toBe(1)
  })

  it('animation class name is added on enter', function () {
    let base = document.getElementsByClassName('base')[0]
    let animated = document.getElementsByClassName('animated')[0]
    expect(base).toEqual(animated)
  })

  it('removes animation class', function (done) {
    setTimeout(function () {
      let animated = document.getElementsByClassName('animated')
      expect(animated.length).toBe(0)
      done()
    }, 4000)
  })

  it('adds animation class on props change', function (done) {
    render(<PushNewProps />, root)
    setTimeout(function () {
      let animated = document.getElementsByClassName('animated')
      expect(animated.length).toBe(0)

      setTimeout(function () {
        let animated = document.getElementsByClassName('animated')
        expect(animated.length).toBe(1)
        done()
      }, 100)
    }, 150)
  })
})
