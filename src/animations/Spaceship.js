import * as React from 'react'
import { ANIMATION_DURATION } from '../constants'
import posed from 'react-pose'
import spaceship from '../images/spaceship.png'
import styled from 'styled-components'

const spaceshipConfig = {
  left: {
    scale: 0,
    opacity: 0,
    transition: { duration: ANIMATION_DURATION },
    x: '-120%',
  },
  right: {
    scale: 2,
    opacity: 1,
    transition: { duration: ANIMATION_DURATION },
    x: window.innerWidth + 300,
    y: '1000px',
  },
}

const SpaceshipPose = posed.img(spaceshipConfig)
const SpaceshipImage = styled(SpaceshipPose)`
  width: 100px;
`

const Spaceship = ({ pose }) => {
  return <SpaceshipImage pose={pose} src={spaceship} />
}

export default Spaceship
