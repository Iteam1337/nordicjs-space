import * as React from 'react'
import { injectGlobal } from 'styled-components'
import { start } from './backgroundNoise'
import App from './App'
import ReactDOM from 'react-dom'
import verite from './fonts/verite916.woff'

injectGlobal`
  @font-face {
    font-family: 'verite916';
    src: url(${verite}) format('woff');
  }

  * {
    box-sizing: border-box;
    user-select: none;
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
