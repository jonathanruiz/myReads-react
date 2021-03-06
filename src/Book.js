import React, { Component } from "react";

class Book extends Component {
  render() {
    let bookThumbnail =
      this.props.book.imageLinks && this.props.book.imageLinks.thumbnail;

    let bookStyle = {
      width: 128,
      height: 193,
      backgroundImage: `url("${bookThumbnail}")`
    };

    return (
      <li>
        <div className="book">
          <div className="book-top">
            <div className="book-cover" style={bookStyle} />
            <div className="book-shelf-changer">
              <select
                onChange={event => {
                  this.props.updateBook(this.props.book, event.target.value);
                }}
                value={this.props.book.shelf || "none"}
              >
                <option value="move" disabled>
                  Move to...
                </option>
                <option value="currentlyReading">Currently Reading</option>
                <option value="wantToRead">Want to Read</option>
                <option value="read">Read</option>
                <option value="none">None</option>
              </select>
            </div>
          </div>
          <div className="book-title">{this.props.book.title}</div>
          <div className="book-authors">
            {(this.props.book.authors && this.props.book.authors[0]) ||
              "Unknown Author"}
          </div>
        </div>
      </li>
    );
  }
}

export default Book;
