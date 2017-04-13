import React, { Component } from 'react'
import { BrowserRouter, Link } from 'react-router-dom'
import '../styles/Header.css'

class Header extends Component {
  render() {
    return (
      <header className="header">
        <div className="header-wrap">
          <BrowserRouter>
            <Link to="/" title="Couple Movies" className="header-logo">Couple Movies</Link>
          </BrowserRouter>

          <div className="header-right">
            <button type="button" className="header-btn">
              <i className="fa fa-search" aria-hidden="true"></i>
            </button>
          </div>
        </div>
      </header>
    )
  }
}

export default Header
