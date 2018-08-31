import * as React from 'react'
import { ANIMATION_DURATION } from '../constants'
import alien from '../images/alien.png'
import posed from 'react-pose'
import styled from 'styled-components'

const alienConfig = {
  left: {
    transition: { duration: ANIMATION_DURATION / 2 },
    x: '-300%',
    y: '30vh',
  },
  right: {
    transition: { duration: ANIMATION_DURATION / 2 },
    rotateY: -180,
    x: window.innerWidth + 1000,
    y: '40vh',
  },
}

const AlienPose = posed.img(alienConfig)
const AlienImage = styled(AlienPose)`
  width: 75px;
`

const Alien = ({ pose }) => {
  return <AlienImage pose={pose} src={alien} />
}

export default Alien
