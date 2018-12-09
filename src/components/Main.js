import React, { Component } from 'react'

import Landing from './Landing'
import Riddle from './Riddle'

class Main extends Component {
  constructor() {
    super()
    this.handleGameInitClick = this.handleGameInitClick.bind(this)
    this.state = {
      isGameStarted: false,
      error: null,
      riddles: []
    }
  }

  componentDidMount() {
    const NODE_ENV = process.env.NODE_ENV || 'development'
    const API_URL = (NODE_ENV === 'development')
      ? 'http://localhost:3001/api/v1/riddles'
      : 'https://conundrum-api.now.sh/api/v1/riddles'
    fetch(API_URL)
      .then(response => response.json())
      .then(riddles => {
        this.setState({
          riddles
        })
      }, error => {
        console.error(error)
        this.setState({
          error
        })
      })
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
          ? ( <Riddle riddles={this.state.riddles} /> )
          : ( <Landing handleGameInitClick={this.handleGameInitClick} /> )
        }
      </main>
    )
  }
}

export default Main
