import React from 'react'
import styled from 'styled-components'
import Stars from './Stars'
import { mute } from './backgroundNoise'
import { randomInt } from './utils/randomValue'
import Alien from './animations/Alien'
import Rocket from './animations/Rocket'
import Spaceship from './animations/Spaceship'
import { ANIMATION_DURATION } from './constants'
import Computer from './Computer'

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

class App extends React.Component {
  state = {
    alien: 'left',
    rocket: 'left',
    spaceship: 'left',
  }

  componentDidMount () {
    this.randomAnimation()

    this.interval = setInterval(this.randomAnimation, ANIMATION_DURATION * 2)
  }

  componentWillUnmount () {
    clearInterval(this.interval)
  }

  randomAnimation = () => {
    const animations = ['spaceship', 'alien', 'rocket']
    const animationValue = randomInt(0, animations.length - 1)

    this.toggleAnimation(animations[animationValue])
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
    return (
      <Wrap>
        <Mute onClick={mute} />
        <Computer isLoading={false} />

        <Spaceship pose={this.state.spaceship} />
        <Alien pose={this.state.alien} />
        <Rocket pose={this.state.rocket} />

        <div>
          <Stars />
        </div>
      </Wrap>
    )
  }
}

export default App
