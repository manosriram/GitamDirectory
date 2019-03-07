import Spinner from "react-spinner-material";
import React from "react";
import "./loggedHome.css";
import "./components.css";
const axios = require("axios");

class UserProfile extends React.Component {
  state = {
    details: {},
    postData: [],
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
        postData: result
      });
    }

    this.setState({ isSpinning: false });
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
            {this.state.postData.map((post, postIndex) => {
              return (
                <div id="mainPost">
                  <br />
                  <br />
                  <h5 id="postUser" key={postIndex}>
                    {this.state.details.name}{" "}
                  </h5>
                  <br />
                  <h4 id="postBody">{post.body}</h4>
                  <br />
                  <br />;
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
