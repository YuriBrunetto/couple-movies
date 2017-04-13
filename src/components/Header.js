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
            <div className="header-user">
              <div className="header-user-info">
                <p className="name">Yuri Brunetto</p>
                <button type="button" className="logout">Logout</button>
              </div>
              <div className="header-user-photo">
                <img src="https://avatars2.githubusercontent.com/u/5321477?v=3&s=460" alt="Yuri Brunetto" />
              </div>
            </div>
          </div>
        </div>
      </header>
    )
  }
}

export default Header
