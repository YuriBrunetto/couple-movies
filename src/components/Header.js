import React, { Component } from 'react'
import { BrowserRouter, Link } from 'react-router-dom'
import '../styles/Header.css'

import SearchBar from './SearchBar'

class Header extends Component {
  constructor(props) {
    super(props)

    this.state = {
      isSearchOpen: false
    }

    this.toggleSearch = this.toggleSearch.bind(this)
  }

  toggleSearch() {
    this.setState({ isSearchOpen: !this.state.isSearchOpen })
  }

  render() {
    return (
      <header className="header">
        <div className="header-wrap">
          <div className="header-right">
            {
              this.state.isSearchOpen ?
                <SearchBar /> :
                <BrowserRouter>
                  <Link to="/" title="Couple Movies" className="header-logo">Couple Movies</Link>
                </BrowserRouter>
            }
            <button type="button" className="header-btn" onClick={this.toggleSearch}>
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
