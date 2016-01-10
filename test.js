/* eslint-env jasmine */

import React from 'react'
import { render } from 'react-dom'
import AnimateOnChange from './index.js'

describe('react-animate-on-change', function () {
  let root
  beforeEach(function () {
    document.body.innerHTML = '<div id="root"></div>'
    root = document.getElementById('root')
  })

  it('renders to dom', function () {
    render(<AnimateOnChange
      baseClassName='asdf'
      animationClassName='fdsa'
      animate={true}>
        <div>content</div>
      </AnimateOnChange>, root)

    let elms = document.getElementsByClassName('asdf')
    expect(elms.length).toBe(1)
  })
})
