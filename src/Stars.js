import * as React from 'react'
import styled, { keyframes } from 'styled-components'
import { randomValue } from './utils/randomValue'

const blink = keyframes`
  0% {
    opacity: 1;
  }

  50% {
    opacity: 0.5;
  }

  100% {
    opacity: 1;
  }
`

const StarWrap = styled.div`
  animation: ${blink} infinite ${p => p.animationSpeed}s ease-in-out;
  animation-delay: ${p => p.delay}s;
  background-color: #fff;
  border-radius: 100%;
  height: 3px;
  filter: blur(1px);
  left: ${p => p.left}px;
  position: fixed;
  transform: ${p => `scale(${p.scale})`};
  top: ${p => p.top}px;
  width: 3px;
`

class Stars extends React.Component {
  shouldComponentUpdate () {
    return false
  }

  render () {
    return (
      <React.Fragment>
        {[...Array(40).keys()].map(key => {
          const position = {
            animationSpeed: randomValue(1, 5),
            left: randomValue(0, window.innerWidth),
            top: randomValue(0, window.innerHeight),
            delay: randomValue(0, 5),
            scale: randomValue(0, 2.5),
          }

          return <StarWrap key={key} {...position} />
        })}
      </React.Fragment>
    )
  }
}

export default Stars
