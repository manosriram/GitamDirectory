import Spinner from "react-spinner-material";
import React from "react";
import "./loggedHome.css";
import "./components.css";
import SearchProfile from "./SearchProfile";
const axios = require("axios");
const moment = require("moment");

class UserProfile extends React.Component {
  state = {
    searchUser: false,
    payload: null,
    details: {},
    postData: [],
    following: [],
    followers: [],
    active: false,
    isSpinning: false,
    isLogged: false,
    showFollowingList: false,
    showFollowersList: false,
    confirmDeletion: false,
    errorMessage: ""
  };

  deleteAllPosts = async () => {
    const email = this.state.details.email;
    try {
      const res1 = await fetch("/api/deleteAllPosts", {
        method: "POST",
        headers: {
          Accept: "application/json, text/plain, */*",
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ email: email })
      });
      const res2 = await res1.json();
    } catch (er) {
      console.log(er);
    }
  };

  confirmDelete = async () => {
    const email = this.state.details.email;
    try {
      const res1 = await fetch("/api/deleteAccount", {
        method: "POST",
        headers: {
          Accept: "application/json, text/plain, */*",
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ email: email })
      });
      const res2 = await res1.json();
      window.location = "/";
    } catch (er) {
      console.log(er);
    }
  };

  deleteAccount = e => {
    this.setState({ confirmDeletion: true });
  };

  getUserInfo = async e => {
    this.setState({ isSpinning: true });
    const email = e.target.name;
    try {
      const res1 = await fetch("/api/getUserInfo", {
        method: "POST",
        headers: {
          Accept: "application/json, text/plain, */*",
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ email })
      });
      const res2 = await res1.json();
      if (res2.user === null) {
        this.setState({
          isSpinning: false,
          errorMessage: "Profile Not Found."
        });
        return;
      } else {
        this.setState({
          isSpinning: false,
          payload: res2.user,
          searchUser: true
        });
      }
    } catch (er) {
      console.log(er);
    }
    console.log(this.state.payload);
  };

  getFollowingList = async () => {
    this.setState({ isSpinning: true });
    try {
      const res1 = await fetch("/api/getFollowing", {
        method: "POST",
        headers: {
          Accept: "application/json, text/plain, */*",
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ email: this.state.details.email })
      });
      const res2 = await res1.json();
      this.setState({
        following: res2.following,
        isSpinning: false,
        showFollowingList: true
      });
    } catch (er) {
      console.log(er);
    }
  };

  getFollowersList = async () => {
    this.setState({ isSpinning: true });
    try {
      const res1 = await fetch("/api/getFollowers", {
        method: "POST",
        headers: {
          Accept: "application/json, text/plain, */*",
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ email: this.state.details.email })
      });
      const res2 = await res1.json();
      this.setState({
        isSpinning: false,
        followers: res2.followers,
        showFollowersList: true
      });
    } catch (er) {
      console.log(er);
    }
  };

  componentWillMount = async () => {
    this.setState({ isSpinning: true });
    try {
      const tar1 = await axios.post("/auth/getUser");

      const tar = await tar1;

      if (tar.data.data === "") {
        this.setState({ isLogged: false });
      } else this.setState({ isLogged: true });

      const postData = await fetch("/api/getAllUserPosts", {
        method: "POST",
        headers: {
          Accept: "application/json, text/plain, */*",
          "Content-Type": "application/json"
        },
        body: JSON.stringify(tar.data.user1)
      });
      const result = await postData.json();

      if (tar.data.user1) {
        this.setState({
          details: tar.data.user1,
          postData: result.reverse()
        });
      }
      this.setState({ isSpinning: false });
    } catch (er) {
      console.log(er);
    }
  };

  showMore = () => {
    this.setState({
      active: !this.state.active
    });
  };

  deletePost = async e => {
    const res1 = await fetch("/api/deletePost", {
      method: "POST",
      headers: {
        Accept: "application/json, text/plain, */*",
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ postID: e.target.id })
    });
    window.location = "/userProfile";
  };

  render() {
    if (this.state.isSpinning === true) {
      return (
        <div>
          <Spinner
            size={80}
            spinnerColor={"white"}
            spinnerWidth={2}
            visible={this.state.isSpinning}
            id="spinner_1"
          />
        </div>
      );
    } else {
      if (this.state.confirmDeletion === true) {
        var body = document.getElementById("1");
        body.setAttribute("class", "blur");
        var hidden = document.getElementById("hide");
        hidden.style.display = "block";
      }

      if (this.state.isLogged === false) {
        return (window.location = "/");
      }

      if (this.state.searchUser === true && this.state.payload) {
        return <SearchProfile data={this.state.payload} />;
      }

      if (this.state.showFollowingList === true) {
        return (
          <React.Fragment>
            <br />
            {this.state.following.length === 0 && <h2>Nothing to Show.</h2>}
            {this.state.following.length > 0 && <h1>Following List</h1>}
            <br />
            <h3 id="erMsg"> {this.state.errorMessage} </h3>
            <br />
            {this.state.following.map((user, userID) => {
              return (
                <React.Fragment>
                  <div id="followingList" key={userID}>
                    <h2>
                      <a onClick={this.getUserInfo} name={user.email} id="user">
                        {user.name}
                      </a>{" "}
                    </h2>
                    <h3>{user.email}</h3>
                  </div>
                  <br />
                </React.Fragment>
              );
            })}
          </React.Fragment>
        );
      }

      if (this.state.showFollowersList === true) {
        return (
          <React.Fragment>
            <br />
            <br />
            <br />

            {this.state.followers.length === 0 && <h2>Nothing to Show.</h2>}
            {this.state.followers.length > 0 && <h1>Followers List</h1>}
            <br />
            <h3 id="erMsg"> {this.state.errorMessage} </h3>
            <br />
            {this.state.followers.map((user, userID) => {
              return (
                <React.Fragment>
                  <div id="followingList" key={userID}>
                    <h2>
                      <a onClick={this.getUserInfo} name={user.email} id="user">
                        {user.name}
                      </a>{" "}
                    </h2>
                    <h3>{user.email}</h3>
                  </div>
                  <br />
                </React.Fragment>
              );
            })}
          </React.Fragment>
        );
      }

      return (
        <div>
          <div id="hide">
            <h1>Are You Sure ?</h1>
            <button className="btn btn-danger" onClick={this.confirmDelete}>
              YES
            </button>
          </div>
          <div id="1">
            <div class="sidenav">
              <h1>{this.state.details.name}</h1>

              <div id="followModel">
                <a href="#" onClick={this.getFollowingList}>
                  Following
                </a>{" "}
                <a href="#" onClick={this.getFollowersList}>
                  Followers
                </a>
              </div>
              <br />
              {this.state.details.bio && (
                <div id="userBio">
                  <h4>{this.state.details.bio}</h4>
                  <br />
                </div>
              )}
              {this.state.details.designation && (
                <h3 id="desg">Works as {this.state.details.designation}</h3>
              )}
              <br />
              <h3>Lives in {this.state.details.location}</h3>
              <br />
              <h3>Is {this.state.details.age} years old.</h3>
              <br />
              <h3 id="em">{this.state.details.email}</h3>
              <br />
              <div id="deleteButtonGroup">
                <button
                  id="deleteAcc"
                  className="btn btn-danger"
                  onClick={this.deleteAccount}
                >
                  Delete Account
                </button>
                &nbsp;&nbsp;&nbsp;&nbsp; &nbsp;
                <button
                  id="deletePost"
                  className="btn btn-danger"
                  onClick={this.deleteAllPosts}
                >
                  Delete All Posts.
                </button>
              </div>
              <br />
            </div>
            <div id="postArea">
              {this.state.postData.length === 0 && <h4>No Posts to show.</h4>}
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
                if (flag === 1) {
                  data = post.body.substring(0, 150) + ` ....`;
                }
                if (this.state.active === true) {
                  data = post.body;
                }
                var ago = moment(post.timestamp).fromNow();

                return (
                  <div id="2">
                    <br />
                    <div id="mainPost">
                      <p
                        id={post._id}
                        onClick={this.deletePost}
                        className="delete"
                      >
                        delete
                      </p>
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
          </div>
        </div>
      );
    }
    // }
  }
}

export default UserProfile;
