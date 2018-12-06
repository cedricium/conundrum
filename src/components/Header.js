import React, { Component } from 'react'

class Header extends Component {
  render() {
    return (
      <header className="Header">
        <h1>
          <span
            className="logo" 
            role="img"
            aria-label="brain emoji">🧠</span> conundrum
        </h1>
      </header>
    )
  }
}

export default Header
