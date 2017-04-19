import React, { Component } from 'react'

// Components
import Home from './components/Home'
import Header from './components/Header'
import MoviesList from './components/MoviesList'

class App extends Component {
  render() {
    return (
      <div>
        <Home />
        <Header />
        <MoviesList />
      </div>
    )
  }
}

export default App
