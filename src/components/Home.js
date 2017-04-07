import React from 'react'
import '../styles/Home.css'

const Home = () => {
  return (
    <main className="home">
      <h1>Couple Movies</h1>
      <h2>
        now, you'll <span>never forget</span> to watch it <i className="fa fa-heart" aria-hidden="true"></i>
      </h2>
      <button type="button" className="sign-up">Sign Up with Facebook</button>
    </main>
  )
}

export default Home
