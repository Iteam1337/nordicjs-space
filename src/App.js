import * as Fireworks from 'fireworks-canvas'
import * as React from 'react'
import { ANIMATION_DURATION } from './constants'
import { mute } from './backgroundNoise'
import { randomInt } from './utils/randomValue'
import Alien from './animations/Alien'
import Computer from './Computer'
import Rocket from './animations/Rocket'
import Spaceship from './animations/Spaceship'
import Stars from './Stars'
import styled from 'styled-components'

const Wrap = styled.div`
  background: #000;
  height: 100vh;
`

const Mute = styled.div`
  height: 100px;
  position: fixed;
  right: 0;
  top: 0;
  width: 100px;

  &:hover {
    background-color: #222;
  }
`

const FireworksCanvas = styled.div`
  bottom: 0;
  left: 0;
  position: fixed;
  right: 0;
  top: 0;
`

const INITIAL_TEXT = ''

class App extends React.Component {
  fireworksCanvas = React.createRef()
  state = {
    alien: 'left',
    isLoading: false,
    rocket: 'left',
    spaceship: 'left',
    text: INITIAL_TEXT,
  }

  componentDidMount () {
    this.randomAnimation()

    this.interval = setInterval(this.randomAnimation, ANIMATION_DURATION * 2)

    document.addEventListener('keydown', this.handleSpace)
  }

  componentWillUnmount () {
    document.removeEventListener('keydown', this.handleSpace)
    clearInterval(this.interval)
  }

  randomAnimation = () => {
    const animations = ['spaceship', 'alien', 'rocket']
    const animationValue = randomInt(0, animations.length - 1)

    this.toggleAnimation(animations[animationValue])
  }

  handleSpace = async e => {
    if (e.which === 32) {
      document.removeEventListener('keydown', this.handleSpace)

      this.setState(() => ({
        isLoading: true,
      }))

      const response = await fetch('http://localhost:4000/')
      const data = await response.json()

      setTimeout(() => {
        let text = ''
        let win = false
        let typeOfWin = 'small'

        switch (data.item) {
          case 'Nitlott':
            text = 'Sorry, no price for you :('
            break
          case 'Tröstpris':
            text = 'Woohoo! The TRÖSTPRIS is yours!'
            win = true
            break
          case 'Solcellsladdare':
            text = 'Yeah!!! You are a winner of our FIRST PRICE!'
            win = true
            typeOfWin = 'large'
            break
          default:
            text = ''
            break
        }

        if (win) {
          this.fireworks(typeOfWin)
        }

        this.setState(() => ({
          text,
          isLoading: false,
        }))

        setTimeout(() => {
          document.addEventListener('keydown', this.handleSpace)
          this.resetText()
        }, 20000)
      }, 5000)
    }
  }

  fireworks = typeOfWin => {
    const options = {
      maxRockets: typeOfWin === 'small' ? 4 : 20,
      rocketSpawnInterval: 100,
      numParticles: 100,
      explosionMinHeight: 0.4,
      explosionChance: 10,
    }

    const fireworks = new Fireworks(
      document.getElementById('fireworks'),
      options
    )

    fireworks.start()

    setTimeout(() => {
      fireworks.stop()

      const canvas = document.querySelector('#fireworks canvas')

      canvas.parentNode.removeChild(canvas)
    }, 18000)
  }

  resetText = () => {
    this.setState({
      text: INITIAL_TEXT,
    })
  }

  toggleAnimation = animation => {
    // this.setState(state => ({
    //   alien: state.alien === 'right' ? 'left' : 'right',
    //   rocket: state.rocket === 'right' ? 'left' : 'right',
    //   spaceship: state.spaceship === 'right' ? 'left' : 'right',
    // }))

    this.setState(state => ({
      [animation]: state[animation] === 'right' ? 'left' : 'right',
    }))
  }

  render () {
    const { alien, isLoading, rocket, spaceship, text } = this.state

    return (
      <Wrap>
        <FireworksCanvas id="fireworks" />
        <Mute onClick={mute} />
        <Computer isLoading={isLoading} text={text} />

        <Alien pose={alien} />
        <Rocket pose={rocket} />
        <Spaceship pose={spaceship} />

        <Stars />
      </Wrap>
    )
  }
}

export default App
