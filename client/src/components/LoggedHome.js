import React from "react";
import "./loggedHome.css";
const moment = require("moment");

class LoggedHome extends React.Component {
  state = {
    status: "",
    feedData: []
  };

  componentDidMount = async () => {
    const res1 = await fetch("/feed/userFeed", {
      method: "POST",
      headers: {
        Accept: "application/json, text/plain, */*",
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ data: this.props.data.follows })
    });
    const res2 = await res1.json();
    this.setState({ feedData: res2.feedData.reverse() });
    console.log(this.state);
  };

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
    var innerData = document.getElementById("postReady");
    innerData.value = "";
    const res = await fetch("/api/submitStatus", {
      method: "POST",
      headers: {
        Accept: "application/json, text/plain, */*",
        "Content-Type": "application/json"
      },
      body: JSON.stringify(data)
    });
    this.setState({ status: "" });
  };

  render() {
    return (
      <div>
        <br />
        <br />
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
            value={this.state.status}
            placeholder="Update  your  Status."
          />
          <br />
          <input type="submit" value="Post" id="post" />
        </form>
        <div id="postBox" />
        <br />
        <br />
        <div id="feedData">
          {this.state.feedData.map((el, ind) => {
            var ago = moment(el.timestamp).fromNow();
            return (
              <div>
                <div id="feedBox">
                  {" "}
                  <h5>
                    Post By <strong> {el.userName} </strong> &nbsp;&nbsp;(
                    {ago})
                  </h5>
                  <h4>{el.body}</h4>
                  <br />
                </div>
                <br />
              </div>
            );
          })}
        </div>
      </div>
    );
  }
}

export default LoggedHome;
