import React, { Component } from 'react'
import '../styles/MoviesList.css'

import MovieCard from './MovieCard'

class MoviesList extends Component {
  render() {
    return (
      <main className="movies">
        <MovieCard />
        <MovieCard />
        <MovieCard />
        <MovieCard />
      </main>
    )
  }
}

export default MoviesList
