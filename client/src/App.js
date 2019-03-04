import React, { Component } from "react";
import "./App.css";
import Navbar from "./components/Navbar";
import Intro from "./components/Intro";
import { BrowserRouter, Route } from "react-router-dom";

class App extends Component {
  render() {
    return (
      <div className="App">
        <Navbar />
        <BrowserRouter>
          <div className="App">
            <Route exact path="/" component={Intro} />
          </div>
        </BrowserRouter>
      </div>
    );
  }
}

export default App;
