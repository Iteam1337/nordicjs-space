import { start } from './backgroundNoise'
import React from 'react'
import ReactDOM from 'react-dom'
import App from './App'
import { injectGlobal } from 'styled-components'
import verite from './fonts/verite916.woff'

injectGlobal`
  @font-face {
    font-family: 'verite916';
    src: url(${verite}) format('woff');
  }

  body {
    font-family: 'verite916', monospace;
    margin: 0;
    padding: 0;
    -webkit-font-smoothing: antialiased;
  }
`

start()

ReactDOM.render(<App />, document.getElementById('root'))
