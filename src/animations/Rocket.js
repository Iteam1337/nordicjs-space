import * as React from 'react'
import { ANIMATION_DURATION } from '../constants'
import posed from 'react-pose'
import rocket from '../images/raket.svg'
import styled from 'styled-components'

const rocketConfig = {
  left: {
    transition: { duration: ANIMATION_DURATION / 2 },
    x: '-400%',
    y: '800px',
  },
  right: {
    transition: { duration: ANIMATION_DURATION / 2 },
    x: window.innerWidth + 1000,
    y: '100px',
  },
}

const rocketPose = posed.img(rocketConfig)
const RocketImage = styled(rocketPose)`
  width: 75px;
`

const Rocket = ({ pose }) => {
  return <RocketImage pose={pose} src={rocket} />
}

export default Rocket
