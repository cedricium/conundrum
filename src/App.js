import React, { Component } from 'react'
import './App.css'

import Header from './components/Header'
import Main from './components/Main'
import Footer from './components/Footer'

class App extends Component {
  render() {
    return (
      <div className="App">
        <div className="wrapper">
          <div className="container">
            <div className="inner">
              <div className="col left">
                <Header />
                <Main />
                <Footer />
              </div>
              <div className="col right"></div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default App
