import React, { Component } from "react";
import "./App.css";
import Navbar from "./components/Navbar";
import Intro from "./components/Intro";
import { BrowserRouter, Route } from "react-router-dom";
import UserProfile from "./components/UserProfile";
import ShowProfiles from "./components/ShowProfiles";

class App extends Component {
  render() {
    return (
      <div className="App">
        <Navbar />
        <BrowserRouter>
          <div className="App">
            <Route exact path="/" component={Intro} />
            <Route exact path="/userProfile" component={UserProfile} />
            <Route exact path="/searchUser" component={ShowProfiles} />
          </div>
        </BrowserRouter>
      </div>
    );
  }
}

export default App;
