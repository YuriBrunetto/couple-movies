import React, { Component } from 'react'
import { BrowserRouter, Link } from 'react-router-dom'
import '../styles/Header.css'
import DropdownMenu from 'react-dd-menu'

class Header extends Component {
  constructor() {
    super()
    this.state = { isMenuOpen: false }
  }

  toggle = () => {
    this.setState({ isMenuOpen: !this.state.isMenuOpen })
  }
  close = () => {
    this.setState({ isMenuOpen: false })
  }
  click = () => {
    console.log('clicked an item')
  }

  render() {
    let menuOptions = {
      isOpen: this.state.isMenuOpen,
      close: this.close.bind(this),
      toggle:
        <button type="button" className="header-menu" onClick={this.toggle.bind(this)}>
          <i className="fa fa-bars" aria-hidden="true"></i>
        </button>,
      align: 'left'
    }

    return (
      <header className="header">
        <div className="header-wrap">
          <BrowserRouter>
            <Link to="/" title="Couple Movies" className="header-logo">Couple Movies</Link>
          </BrowserRouter>

          <DropdownMenu {...menuOptions}>
            <li>tste</li>
          </DropdownMenu>
        </div>
      </header>
    )
  }
}

export default Header
