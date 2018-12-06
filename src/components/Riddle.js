import React, { Component } from 'react'

import riddles from '../riddles.json'

class Riddle extends Component {
  constructor() {
    super()
    this.handleRevealAnswerClick = this.handleRevealAnswerClick.bind(this)
    this.state = {
      isAnswerDisplayed: false,
      riddle: {
        riddle: '',
        answer: ''
      }
    }
  }

  componentDidMount() {
    this.fetchRiddle()
  }

  componentWillUnmount() {
    clearTimeout(this.timerID)
  }

  fetchRiddle() {
    const randomRiddle = riddles[Math.floor(Math.random() * riddles.length)]
    this.setState({
      isAnswerDisplayed: false,
      riddle: {...randomRiddle}
    })
  }

  handleRevealAnswerClick() {
    this.setState({isAnswerDisplayed: true})
    this.timerID = setTimeout(
      () => this.fetchRiddle(),
      5000
    )
  }

  render() {
    return (
      <div className="Riddle">
        <label>Question</label>
        <div className="content-container">
          <p className="content question">
            { this.state.riddle.riddle }
          </p>
        </div>
        <label>Answer</label>
        <div className="content-container">
          {
            !this.state.isAnswerDisplayed
            ? ( <button
                  className="btn reveal-answer"
                  onClick={this.handleRevealAnswerClick}>
                  Reveal Answer <span role="img" aria-label="sparkles emoji">✨</span>
                </button> )
            : ( <p className="content answer">{ this.state.riddle.answer }</p> )
          }
        </div>
      </div>
    )
  }
}

export default Riddle
