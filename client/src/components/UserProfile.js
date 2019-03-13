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
    showFollowersList: false
  };

  getUserInfo = async e => {
    const email = e.target.name;
    this.setState({ isSpinning: true });
    const res1 = await fetch("/api/getUserInfo", {
      method: "POST",
      headers: {
        Accept: "application/json, text/plain, */*",
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ email })
    });
    const res2 = await res1.json();
    console.log(res2);
    this.setState({ isSpinning: false, payload: res2.user, searchUser: true });
  };

  getFollowingList = async () => {
    this.setState({ isSpinning: true });
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
    console.log(this.state);
  };

  getFollowersList = () => {
    console.log("Followers List");
  };

  componentWillMount = async () => {
    this.setState({ isSpinning: true });
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
    console.log(result);

    if (tar.data.user1) {
      this.setState({
        details: tar.data.user1,
        postData: result.reverse()
      });
    }

    this.setState({ isSpinning: false });
  };

  showMore = () => {
    this.setState({
      active: !this.state.active
    });
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
      if (this.state.isLogged === false) {
        return (window.location = "/");
      }

      if (this.state.searchUser === true) {
        return <SearchProfile data={this.state.payload} />;
      }

      if (this.state.showFollowingList === true) {
        return (
          <>
            <h1>Following List</h1>
            <br />
            {this.state.following.map((user, userID) => {
              return (
                <>
                  <div id="followingList" key={userID}>
                    <h2>
                      <a onClick={this.getUserInfo} name={user.email} id="user">
                        {user.name}
                      </a>{" "}
                    </h2>
                    <h3>{user.email}</h3>
                  </div>
                  <br />
                </>
              );
            })}
          </>
        );
      }

      return (
        <div>
          <div class="sidenav">
            <h1>{this.state.details.name}</h1>
            {/* <br /> */}

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
        </div>
      );
    }
    // }
  }
}

export default UserProfile;
