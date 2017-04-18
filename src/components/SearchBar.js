import React, { Component } from 'react'
import '../styles/SearchBar.css'

class SearchBar extends Component {
  constructor(props) {
    super(props)

    this.state = {
      search: ''
    }

    this.handleSearch = this.handleSearch.bind(this)
  }


  handleSearch(e) {
    this.setState({ search: e.target.value })
  }

  render() {
    return (
      <form className="search">
        <input
          value={this.state.search}
          autoFocus
          type="text"
          className="search-bar"
          placeholder="Search for a movie..."
          onChange={this.handleSearch} />
      </form>
    )
  }
}

export default SearchBar
