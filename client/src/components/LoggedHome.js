import React from "react";
import "./loggedHome.css";
const axios = require("axios");

class LoggedHome extends React.Component {
  componentDidMount() {
    console.log(this.props);
  }
  render() {
    return (
      <div>
        <h1>Welcome {this.props.data.name}</h1>
      </div>
    );
  }
}

export default LoggedHome;
