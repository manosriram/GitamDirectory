import React from "react";
import "./searchUser.css";
import Spinner from "react-spinner-material";
import UserProfile from "./UserProfile";
import SearchProfile from "./SearchProfile";

class ShowProfiles extends React.Component {
  state = {
    userPosts: [],
    query: "",
    resultantData: null,
    search: false,
    isSpinning: false,
    redirect: false,
    data: null
  };

  handleFormChange = e => {
    this.setState({ query: e.target.value });
  };

  searchUser = async e => {
    e.preventDefault();
    const name = e.target.name;
    try {
      const res1 = await fetch(`/api/getUser/${name}`, {
        method: "POST",
        headers: {
          Accept: "application/json, text/plain, */*",
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ name })
      });
      const res2 = await res1.json();
      this.setState(
        { redirect: true, data: res2.data, userPosts: res2.posts },
        () => console.log(this.state)
      );
    } catch (er) {
      console.log(er);
    }
  };

  handleFormSubmit = async event => {
    event.preventDefault();
    this.setState({ isSpinning: true });
    var data = {
      parameter: this.state.query
    };
    try {
      const res = await fetch("/api/getUserProfile", {
        method: "POST",
        headers: {
          Accept: "application/json, text/plain, */*",
          "Content-Type": "application/json"
        },
        body: JSON.stringify(data)
      });
      const result = await res.json();
      this.setState(
        { resultantData: result, search: true, isSpinning: false },
        () => console.log(this.state)
      );
    } catch (er) {
      console.log(er);
    }
  };

  render() {
    if (this.state.isSpinning === true) {
      return (
        <React.Fragment>
          <Spinner
            size={80}
            spinnerColor={"white"}
            spinnerWidth={2}
            visible={this.state.isSpinning}
            id="spinner"
          />
        </React.Fragment>
      );
    }

    if (this.state.redirect === true) {
      return <SearchProfile data={this.state.data} />;
    }

    if (this.state.search === false) {
      return (
        <React.Fragment>
          <form
            id="searchForm"
            onChange={this.handleFormChange}
            onSubmit={this.handleFormSubmit}
          >
            <input
              type="text"
              name="searchParameter"
              id="searchParameter"
              placeholder="User Name"
            />
            <input type="submit" value="Search" />
          </form>
        </React.Fragment>
      );
    }
    if (this.state.search === true) {
      return (
        <div id="fragOK">
          {this.state.resultantData.data.map((user, id) => {
            return (
              <div id="getUser">
                <a
                  href="/userProfile"
                  onClick={this.searchUser}
                  name={user.email}
                >
                  {user.name}
                </a>
                <br />
                {user.email}
                <br />
                <p>{user.bio}</p>
                <br />
              </div>
            );
          })}
        </div>
      );
    }
  }
}

export default ShowProfiles;
