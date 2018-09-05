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

const INITIAL_TEXT = 'Press the button'

class App extends React.Component {
  state = {
    alien: 'left',
    isLoading: false,
    rocket: 'left',
    spaceship: 'left',
    text: INITIAL_TEXT,
    typeOfWin: '',
  }

  spaceTimer = null
  fireworks = null

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
        let typeOfWin = 'dud'

        document.addEventListener('keydown', this.resetSpace)

        switch (data.item) {
          case 'Nitlott':
            text = 'Sorry, no price for you :('
            typeOfWin = 'dud'
            break
          case 'Tröstpris':
            text = 'Woohoo! The TRÖSTPRIS is yours!'
            typeOfWin = 'small'
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
          this.startFireworks(typeOfWin)
        }

        this.setState(() => ({
          text,
          typeOfWin,
          isLoading: false,
        }))

        this.spaceTimer = setTimeout(() => {
          document.removeEventListener('keydown', this.resetSpace)
          document.addEventListener('keydown', this.handleSpace)
          this.resetText()
        }, 20000)
      }, 4000)
    }
  }

  resetSpace = () => {
    clearInterval(this.spaceTimer)
    document.addEventListener('keydown', this.handleSpace)

    if (this.fireworks) {
      this.fireworks.stop()
    }

    this.resetText()
  }

  startFireworks = typeOfWin => {
    const options = {
      maxRockets: typeOfWin === 'small' ? 4 : 20,
      rocketSpawnInterval: 100,
      numParticles: 100,
      explosionMinHeight: 0.4,
      explosionChance: 10,
    }

    this.fireworks = new Fireworks(
      document.getElementById('fireworks'),
      options
    )

    this.fireworks.start()

    setTimeout(() => {
      this.fireworks.stop()

      const canvas = document.querySelector('#fireworks canvas')

      canvas.parentNode.removeChild(canvas)
    }, 18000)
  }

  resetText = () => {
    this.setState({
      text: INITIAL_TEXT,
      typeOfWin: '',
    })
  }

  toggleAnimation = animation => {
    this.setState(state => ({
      [animation]: state[animation] === 'right' ? 'left' : 'right',
    }))
  }

  render () {
    const { alien, isLoading, rocket, spaceship, text, typeOfWin } = this.state

    return (
      <Wrap>
        <FireworksCanvas id="fireworks" />
        <Mute onClick={mute} />
        <Computer isLoading={isLoading} text={text} typeOfWin={typeOfWin} />

        <Alien pose={alien} />
        <Rocket pose={rocket} />
        <Spaceship pose={spaceship} />

        <Stars />
      </Wrap>
    )
  }
}

export default App
