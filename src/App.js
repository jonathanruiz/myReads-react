import React, { Component } from "react";
import { Route } from "react-router-dom";
import Search from "./Search";
import BookShelf from "./BookShelf";
import "./App.css";
import ".";

class BooksApp extends Component {
  render() {
    return (
      <div className="app">
        <Route exact path="/" component={BookShelf} />
        <Route exact path="/search" component={Search} />
      </div>
    );
  }
}

export default BooksApp;
