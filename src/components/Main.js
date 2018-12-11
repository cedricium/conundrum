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
        // filter out long riddles so as to not break layout of page - fixes #2
        const filteredRiddles = riddles.filter(r => {
          const { riddle, answer } = r.data
          const totalLength = riddle.length + answer.length
          return (totalLength <= 200) ? riddle : false
        })
        this.setState({
          riddles: filteredRiddles
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
