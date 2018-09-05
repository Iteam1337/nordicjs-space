import * as React from 'react'
import Screen from './Screen'
import dator from './images/dator.svg'
import hourglass from './images/hourglass.gif'
import styled, { keyframes } from 'styled-components'

const sway = keyframes`
  0% {
    transform: translateX(-49%) translateY(-49%);
  }

  50% {
    transform: translateX(-50%) translateY(-50%);
  }

  100% {
    transform: translateX(-49%) translateY(-49%);
  }
`

const blink = keyframes`
  0% {
    opacity: 0.8;
  }

  20% {
    opacity: 1;
  }

  40% {
    opacity: 0.9;
  }

  60% {
    opacity: 0.75;
  }

  80% {
    opacity: 0.95;
  }

  100% {
    opacity: 0.8;
  }
`

const Wrap = styled.div`
  animation: ${sway} 2s infinite ease-in-out;
  left: 50%;
  position: fixed;
  transform: translateX(-50%) translateY(-50%);
  top: 50%;
  z-index: 5;
`

const ComputerImage = styled.img`
  height: 1000px;
`

const Loading = styled.img`
  left: 50%;
  position: absolute;
  transform: translateX(-50%);
  top: 300px;
  width: 100px;
`

const LoadingIndicator = styled.div`
  animation: ${blink} infinite ${p => (p.isLoading ? '200ms' : '1s')}
    ease-in-out;
  background-color: #54fbac;
  bottom: 120px;
  border-radius: 30px;
  height: 8px;
  position: absolute;
  right: 420px;
  width: 15px;
  z-index: 10;
`

const LoadingIndicatorBlue = LoadingIndicator.extend`
  animation-delay: 500ms;
  background-color: #668cff;
  right: 395px;
`

const LoadingIndicatorRed = LoadingIndicator.extend`
  animation-delay: 1s;
  background-color: #ff3b5c;
  right: 370px;
`

const Computer = ({ isLoading, text, typeOfWin }) => {
  return (
    <Wrap>
      {isLoading && <Loading src={hourglass} />}
      <ComputerImage src={dator} alt="" />
      <LoadingIndicator isLoading={isLoading} />
      <LoadingIndicatorBlue isLoading={isLoading} />
      <LoadingIndicatorRed isLoading={isLoading} />
      {!isLoading && <Screen text={text} typeOfWin={typeOfWin} />}
    </Wrap>
  )
}

export default Computer
