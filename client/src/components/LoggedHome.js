import React from "react";
import "./loggedHome.css";
const axios = require("axios");

class LoggedHome extends React.Component {
  state = {
    status: ""
  };

  componentDidMount() {
    console.log(this.props);
  }

  handleStatusChange = e => {
    this.setState({
      status: e.target.value
    });
  };

  handleStatusSubmit = async e => {
    e.preventDefault();
    const data = {
      status: this.state.status,
      userData: this.props.data
    };
    const res = await fetch("/api/submitStatus", {
      method: "POST",
      headers: {
        Accept: "application/json, text/plain, */*",
        "Content-Type": "application/json"
      },
      body: JSON.stringify(data)
    });
  };

  render() {
    return (
      <div>
        <h1>Welcome {this.props.data.name}</h1>
        <form
          onChange={this.handleStatusChange}
          onSubmit={this.handleStatusSubmit}
        >
          <textarea
            name="status"
            id="postReady"
            cols="100"
            rows="5"
            placeholder="Update Status."
          />
          <br />
          <input type="submit" value="Post" id="post" />
        </form>
        <div id="postBox" />
      </div>
    );
  }
}

export default LoggedHome;
