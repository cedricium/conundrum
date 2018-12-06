import React, { Component } from 'react'

class Landing extends Component {
  render() {
    return  (
      <section className="Landing">
        <p>only the best riddles you've encountered - can you solve them all?</p>
        <button 
          className="btn start-game"
          onClick={this.props.handleGameInitClick}>Start game!</button>
      </section>
    )
  }
}

export default Landing
