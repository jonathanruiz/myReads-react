import React, { Component } from "react";
import { Link } from "react-router-dom";
import Book from "./Book";
import * as BooksAPI from "./BooksAPI";

class Search extends Component {
  constructor(props) {
    super(props);
    this.state = {
      books: [],
      results: [],
      query: ""
    };
  }

  componentDidMount() {
    BooksAPI.getAll().then(res => {
      this.setState({ books: res });
    });
  }

  updateBook = (book, shelf) => {
    BooksAPI.update(book, shelf).then(res => {
      book.shelf = shelf;
      this.setState(state => ({
        books: state.books.filter(b => b.id !== book.id).concat([book])
      }));
    });
  };

  updateQuery = query => {
    this.setState({ query: query }, this.submitQuery);
  };

  submitQuery() {
    if (this.state.query === "" || this.state.query === undefined) {
      return this.setState({ results: [] });
    }
    BooksAPI.search(this.state.query.trim()).then(res => {
      if (res.error) {
        return this.setState({ results: [] });
      } else {
        return this.setState({ results: res });
      }
    });
  }

  render() {
    return (
      <div className="search-books">
        <div className="search-books-bar">
          <Link className="close-search" to="/">
            Close
          </Link>
          <div className="search-books-input-wrapper">
            <input
              value={this.state.query}
              onChange={event => this.updateQuery(event.target.value)}
              type="text"
              placeholder="Search by title or author"
            />
          </div>
        </div>
        <div className="search-books-results">
          <ol className="books-grid">
            {this.state.results.map((item, key) => (
              <Book key={key} book={item} updateBook={this.updateBook} />
            ))}
          </ol>
        </div>
      </div>
    );
  }
}

export default Search;
