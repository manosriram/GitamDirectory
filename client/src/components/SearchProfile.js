import "./loggedHome.css";
import "./components.css";
import React from "react";
const moment = require("moment");

class SearchProfile extends React.Component {
  state = {
    details: null,
    postData: [],
    following: null
  };

  followUser = async () => {
    const res1 = await fetch("/api/followUser", {
      method: "POST",
      headers: {
        Accept: "application/json, text/plain, */*",
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ user: this.state.details.email })
    });
    const res2 = await res1.json();
    this.setState({ following: res2.followed });
  };

  unFollowUser = async () => {
    const res1 = await fetch("/api/unFollowUser", {
      method: "POST",
      headers: {
        Accept: "application/json, text/plain, */*",
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ user: this.state.details.email })
    });
    const res2 = await res1.json();
    this.setState({ following: res2.unFollowed });
  };

  componentWillMount = async () => {
    const email = this.props.data.email;
    this.setState({ details: this.props.data });

    const req1 = await fetch("/api/getFollowStatus", {
      method: "POST",
      headers: {
        Accept: "application/json, text/plain, */*",
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ email })
    });

    const req2 = await req1.json();
    console.log(req2);
    this.setState({ following: req2.following });

    const res1 = await fetch("/api/getAllUserPosts", {
      method: "POST",
      headers: {
        Accept: "application/json, text/plain, */*",
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ email })
    });
    const res2 = await res1.json();
    this.setState({ postData: res2 });
  };

  render() {
    return (
      <React.Fragment>
        <div className="sideNav">
          <h1>{this.state.details.name}</h1>

          {this.state.following === false && (
            <h4 id="followBox" onClick={this.followUser}>
              {" "}
              Follow
              <img src="https://img.icons8.com/material/48/000000/add-user-male.png" />
            </h4>
          )}
          {this.state.following === true && (
            <h4 id="followBox" onClick={this.unFollowUser}>
              {" "}
              Following
              <img src="https://img.icons8.com/ios/50/000000/checked-user-male-filled.png" />
            </h4>
          )}
          <br />
          {/* <p>{this.state.details.bio}</p> */}
          <h4 id="bio">{this.state.details.bio}</h4>
          <br />
          <br />
          {this.state.details.designation && (
            <h3>Works as {this.state.details.designation}</h3>
          )}
          <br />
          <h3>Lives in {this.state.details.location}</h3>
          <br />
          <h3>Is {this.state.details.age} years old.</h3>
          <br />
          <h3 id="em">{this.state.details.email}</h3>
          <br />
        </div>
        <div id="postArea">
          {this.state.postData.length === 0 && <h4>No Posts to Show.</h4>}
          {this.state.postData.length !== 0 && (
            <h4>All Posts by {this.state.details.name}</h4>
          )}

          {this.state.postData.map((post, postIndex) => {
            var flag, data;
            data = post.body;
            if (post.body.length > 30) {
              flag = 1;
            } else {
              flag = 0;
            }
            if (flag == 1) {
              data = post.body.substring(0, 150) + ` ....`;
            }
            if (this.state.active === true) {
              data = post.body;
            }
            var ago = moment(post.timestamp).fromNow();
            return (
              <div>
                <br />
                <div id="mainPost">
                  <br />
                  <br />
                  <h5 id="postUser" key={postIndex}>
                    <strong>{this.state.details.name} </strong>({ago})
                    <br />
                  </h5>
                  <br />
                  <h5 id="postData" key={postIndex + 1}>
                    {data}
                  </h5>
                  <br />

                  <br />
                  {flag === 1 && this.state.active === false && (
                    <button key={postIndex + 2} onClick={this.showMore}>
                      Show More
                    </button>
                  )}
                  {flag === 1 && this.state.active === true && (
                    <button key={postIndex + 3} onClick={this.showMore}>
                      Show Less
                    </button>
                  )}
                  <br />
                  <br />
                </div>
                <br />
                <br />
              </div>
            );
          })}
        </div>
      </React.Fragment>
    );
  }
}

export default SearchProfile;
