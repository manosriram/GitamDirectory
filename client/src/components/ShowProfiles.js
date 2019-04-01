import React from "react";
import "./searchUser.css";
import Spinner from "react-spinner-material";
import SearchProfile from "./SearchProfile";

class ShowProfiles extends React.Component {
  state = {
    userPosts: [],
    query: "",
    resultantData: null,
    search: false,
    isSpinning: false,
    redirect: false,
    data: null,
    listAll: false,
    listAllRedirect: false
  };

  handleFormChange = e => {
    this.setState({ query: e.target.value });
  };

  sendUserData = async e => {
    const email = e.target.id;
    this.setState({ isSpinning: true });
    try {
      const res1 = await fetch("/api/getUserInfo", {
        method: "POST",
        headers: {
          Accept: "application/json, text/plain, */*",
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ email: email })
      });
      const res2 = await res1.json();
      this.setState({
        data: res2.user,
        isSpinning: false,
        listAllRedirect: true
      });
    } catch (er) {
      console.log(er);
    }
  };

  searchUser = async e => {
    e.preventDefault();
    const name = e.target.name;
    this.setState({ spinning: true, listAll: false });
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
      this.setState({
        redirect: true,
        data: res2.data,
        userPosts: res2.posts,
        spinning: false
      });
    } catch (er) {
      console.log(er);
    }
  };

  handleFormSubmit = async event => {
    event.preventDefault();
    var msg = document.getElementById("erMsg");
    if (!event.target.searchParameter.value) {
      msg.innerHTML += `Enter some query..`;
      console.log(msg.innerHTML);
    } else {
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
        this.setState({
          resultantData: result,
          search: true,
          isSpinning: false
        });
      } catch (er) {
        console.log(er);
      }
    }
  };

  listAll = async () => {
    const res1 = await fetch("/api/getAllUsers", {
      method: "POST",
      headers: {
        Accept: "application/json, text/plain, */*",
        "Content-Type": "application/json"
      }
    });
    const res2 = await res1.json();
    this.setState({ users: res2.people, listAll: true });
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

    if (this.state.listAllRedirect === true) {
      var data = {
        email: this.state.email
      };
      return <SearchProfile data={this.state.data} />;
    }

    if (this.state.listAll === true) {
      return (
        <React.Fragment>
          {this.state.users.map((user, userIndex) => {
            return (
              <div>
                <br />
                <br />
                <div id="userBox">
                  <br />
                  <h2
                    onClick={this.sendUserData}
                    id={user.email}
                    className="username"
                  >
                    {user.name}
                  </h2>
                  <br />
                </div>
                <br />
              </div>
            );
          })}
        </React.Fragment>
      );
    }

    if (this.state.redirect === true) {
      return <SearchProfile data={this.state.data} />;
    }

    if (this.state.search === false) {
      return (
        <React.Fragment>
          <h1 id="erMsg" />
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
          <br />
          <br />
          <br />
          <button onClick={this.listAll}>List All Users.</button>
        </React.Fragment>
      );
    }

    if (this.state.search === true) {
      return (
        <div id="fragOK">
          {this.state.resultantData.data.map((user, id) => {
            return (
              <React.Fragment>
                <div id="getUser">
                  <h2>
                    {" "}
                    <a
                      href="/userProfile"
                      onClick={this.searchUser}
                      name={user.email}
                    >
                      {user.name}
                    </a>
                  </h2>
                  <h4> {user.email}</h4>
                  <h6>{user.bio}</h6>
                </div>
                <br />
              </React.Fragment>
            );
          })}
        </div>
      );
    }
  }
}

export default ShowProfiles;
