import React, { Component } from 'react'

import Landing from './Landing'
import Riddle from './Riddle'

class Main extends Component {
  constructor() {
    super()
    this.handleGameInitClick = this.handleGameInitClick.bind(this)
    this.state = {
      isGameStarted: false
    }
  }

  handleGameInitClick() {
    this.setState({
      isGameStarted: true
    })
  }

  render() {
    return (
      <main>
        {
          this.state.isGameStarted
          ? ( <Riddle /> )
          : ( <Landing handleGameInitClick={this.handleGameInitClick} /> )
        }
      </main>
    )
  }
}

export default Main
