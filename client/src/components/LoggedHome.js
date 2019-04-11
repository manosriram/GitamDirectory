import React from "react";
import "./loggedHome.css";
const moment = require("moment");

class LoggedHome extends React.Component {
  state = {
    status: "",
    feedData: [],
    comment: "",
    showComments: false
  };

  showPostComments = () => {
    if (this.state.showComments) {
      var cm = document.getElementById("commentBox");
      cm.innerHTML = "";
    }
    this.setState({ showComments: !this.state.showComments });
  };

  submitComment = async e => {
    const { name, email } = this.props.data;
    const res1 = await fetch("/feed/submitComment", {
      method: "POST",
      headers: {
        Accept: "application/json, text/plain, */*",
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        comment: this.state.comment,
        postID: e.target.value,
        name,
        email
      })
    });
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
    this.setState({ feedData: res2.feedData });
  };

  handleStatusChange = e => {
    this.setState({
      status: e.target.value
    });
  };

  handleComments = e => {
    this.setState({
      comment: e.target.value
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
                  <input
                    type="text"
                    name="comment"
                    id="comment"
                    placeholder="Your Comment"
                    onChange={this.handleComments}
                  />{" "}
                  <button
                    value={el._id}
                    name={el.postBy}
                    onClick={this.submitComment}
                  >
                    submit
                  </button>
                  <br />
                  <div id="commentBox" />
                  {this.state.showComments &&
                    (el.comments.map((comment, commentIndex) => {
                      var cm = document.getElementById("commentBox");
                      cm.innerHTML += el.comments[commentIndex].byName;
                      cm.innerHTML += `  :  `;
                      cm.innerHTML += el.comments[commentIndex].mainBody;
                      cm.innerHTML += `<br/>`;
                    }),
                    <p onClick={this.showPostComments}>hide comments</p>)}
                  {!this.state.showComments && (
                    <p onClick={this.showPostComments}>show comments</p>
                  )}
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
