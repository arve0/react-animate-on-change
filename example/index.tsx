import React from 'react'
import ReactDOM from 'react-dom'
import { createStore, Store } from 'redux'
import { connect, Provider } from 'react-redux'
import AnimateOnChange from '../index.js'

const initialState = {
  diff: 0,
  score: 0
}

interface Action {
  type: string,
  diff: number
}

const reducer = (state = initialState, action: Action) => {
  switch (action.type) {
    case 'INCREMENT_SCORE':
      return { ...state,
        diff: action.diff,
        score: state.score + action.diff }
    default:
      return state
  }
}

const store: Store<typeof initialState, Action> = createStore(reducer)
setInterval(() => {
  store.dispatch({
    type: 'INCREMENT_SCORE',
    diff: 10
  })
}, 2000)

interface Props {
  diff: number,
  score: number,
}

const AppComponent = ({ diff, score }: Props) =>
  <div className='App'>
    <AnimateOnChange
      baseClassName='Score'
      animationClassName='Score--bounce'
      animate={diff !== 0}>
        Score: {score}
    </AnimateOnChange>
  </div>

const App = connect(s => s)(AppComponent)

// @ts-ignore
ReactDOM.render(<Provider store={store}><App/></Provider>,
                document.getElementById('root'))
