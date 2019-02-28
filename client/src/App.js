import React, { Component } from "react";
import "./App.css";
import Navbar from "./components/Navbar";
import Intro from "./components/Intro";

class App extends Component {
  render() {
    return (
      <div className="App">
        <Intro />
      </div>
    );
  }
}

export default App;
