import React from "react";

class Intro extends React.Component {
  state = {
    login: 0
  };

  handleLogin = () => {
    this.setState({ login: 1 }, () => console.log(this.state));
  };

  render() {
    if (this.state.login === 0) {
      return (
        <div>
          <div id="introForm">
            <form>
              <h1>Sign-Up</h1>
              <br />
              <input type="text" placeholder="name" />
              <br />
              <br />
              <input type="text" placeholder="email" />
              <br />
              <br />
              <input className="col-xs-3" type="text" placeholder="password" />
              <br />
              <br />
              <input
                className="col-xs-4 col-xs-offset-2"
                type="text"
                placeholder="repeat-password"
              />
              <br />
              <br />
              <input type="text" placeholder="degree" />
              <br />
              <br />
              <input type="text" placeholder="year of study" />
              <br />
              <br />
              <input type="submit" value="Register" id="registerButton" />
              <h5>or</h5>
            </form>
            <a href="#" onClick={this.handleLogin}>
              Login
            </a>
            <br />
          </div>

          <div id="vertHR" />

          <div id="floatLeftDiv">
            <h2>
              Get all the Status updates from your friends, teachers and clubs
              instantly!
            </h2>
          </div>
        </div>
      );
    }
    if (this.state.login === 1) {
      return (
        <div>
          <form id="loginForm">
            <hr />
            <input type="text" placeholder="email" />
            <br />
            <br />
            <input type="text" placeholder="password" />
            <br />
            <br />
            <input type="submit" value="login" id="loginButton" />
            <hr />
          </form>
        </div>
      );
    }
  }
}

export default Intro;
