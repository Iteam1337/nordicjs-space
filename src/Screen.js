import * as React from 'react'
import { randomInt } from './utils/randomValue'
import nitlott from './images/nitlott.gif'
import styled, { keyframes } from 'styled-components'
import trostpris from './images/trostpris.gif'
import vinst from './images/vinst.gif'

const glitch = keyframes`
${[...Array(10).keys()].map(i => {
  return `${(i + 1) * 10}% {
    clip: rect(${randomInt(0, 100)}px, 9999px, ${randomInt(0, 100)}px, 0);
  }`
})}
`

const Glitch = styled.div`
  color: #fff;
  font-size: 48px;
  position: absolute;
  text-align: center;
  left: 50%;
  top: 200px;
  transform: translateX(-50%);
  z-index: 5;
  width: 450px;

  &:before,
  &:after {
    content: attr(data-text);
    height: 100%;
    left: 0;
    position: absolute;
    top: 0;
    width: 100%;
  }

  &:before {
    animation: ${glitch} 2s infinite linear alternate-reverse;
    background-color: #000;
    clip: rect(44px, 450px, 56px, 0);
    left: 2px;
    text-shadow: -1px 0 red;
  }

  &:after {
    animation: ${glitch} 2s infinite linear alternate-reverse;
    background-color: #000;
    left: -2px;
    text-shadow: -1px 0 blue;
  }
`

const CatGIF = styled.img`
  position: absolute;
  bottom: 470px;
  left: 50%;
  transform: translateX(-50%);
  width: 250px;
`

const Screen = ({ text, typeOfWin }) => {
  let catGif = ''

  switch (typeOfWin) {
    case 'dud':
      catGif = nitlott
      break
    case 'small':
      catGif = trostpris
      break
    case 'large':
      catGif = vinst
      break
    default:
      catGif = ''
      break
  }

  return (
    <div>
      <Glitch data-text={text}>{text}</Glitch>
      <CatGIF src={catGif} />
    </div>
  )
}

export default Screen
