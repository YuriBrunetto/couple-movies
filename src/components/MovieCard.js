import React, { Component } from 'react'
import '../styles/MovieCard.css'

class MovieCard extends Component {
  render() {
    return (
      <div className="movie-card">
        <header className="movie-card-header">
          <div className="movie-card-cover">
            <img src="http://bit.ly/2pA8jEC" alt="Pulp Fiction" width="100%" />
          </div>
          <div className="movie-card-info">
            <h3 className="title">Pulp Fiction</h3>
            <h4 className="subtitle">
              1994<br />
              Quentin Tarantino
            </h4>
            <p className="plot">
              The lives of two mob hit men, a boxer, a gangster’s wife, and a pair of diner bandits intertwine in four tales of violence and redemption.
            </p>
            <button type="button" className="add">+ add to my list</button>
          </div>
        </header>
      </div>
    )
  }
}

export default MovieCard
