import React from "react";
import "./components.css";
const axios = require("axios");

class LoggedHome extends React.Component {
  componentDidMount() {
    console.log(this.props);
  }
  1;
  render() {
    return (
      <div>
        <h1>Logged In!!</h1>
      </div>
    );
  }
}

export default LoggedHome;
