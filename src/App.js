import React, { Component } from 'react'

// Components
import Home from './components/Home'
import Header from './components/Header'
import MoviesList from './components/MoviesList'
import Footer from './components/Footer'

class App extends Component {
  render() {
    return (
      <div>
        <Home />
        <Header />
        <MoviesList />

        <Footer />
      </div>
    )
  }
}

export default App
