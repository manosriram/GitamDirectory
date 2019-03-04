import React from "react";
import "./loggedHome.css";
const axios = require("axios");

class LoggedHome extends React.Component {
  componentDidMount() {
    console.log(this.props);
  }
  1;
  render() {
    return (
      <div>
        <h1>Logged in..</h1>
      </div>
    );
  }
}

export default LoggedHome;
