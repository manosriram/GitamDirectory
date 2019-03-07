import Spinner from "react-spinner-material";
import React from "react";
import "./loggedHome.css";
import "./components.css";
const axios = require("axios");
const moment = require("moment");

class UserProfile extends React.Component {
  state = {
    details: {},
    postData: [],
    active: false,
    isSpinning: false
  };

  componentWillMount = async () => {
    this.setState({ isSpinning: true });
    const tar1 = await axios.post("/auth/getUser");
    const tar = await tar1;

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
      return (
        <div>
          <div class="sidenav">
            <h1>{this.state.details.name}</h1>
            <br />
            <p>{this.state.details.bio}</p>
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
