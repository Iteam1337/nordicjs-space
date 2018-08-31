import * as React from 'react'
import { ANIMATION_DURATION } from '../constants'
import peekaboo from '../images/peekaboo.png'
import posed from 'react-pose'
import styled from 'styled-components'

const peekabooConfig = {
  left: {
    bottom: -200,
    transition: { duration: ANIMATION_DURATION / 2 },
  },
  right: {
    bottom: -60,
    transition: { duration: ANIMATION_DURATION / 2 },
  },
}

const peekabooPose = posed.img(peekabooConfig)
const PeekabooImage = styled(peekabooPose)`
  position: fixed;
  width: 200px;
`

const Peekaboo = ({ pose }) => {
  return <PeekabooImage pose={pose} src={peekaboo} />
}

export default Peekaboo
