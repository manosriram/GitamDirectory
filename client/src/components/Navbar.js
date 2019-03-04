import React from "react";
import "./components.css";
const Cookie = require("js-cookie");

class Navbar extends React.Component {
  state = {
    isLoggedIn: false,
    details: {}
  };

  componentDidMount = async () => {
    const res = await fetch("/auth/getUser", {
      method: "POST",
      headers: {
        Accept: "application/json, text/plain, */*",
        "Content-Type": "application/json"
      }
    });
    const re = await res.json();
    this.setState({ details: re.user1, isLoggedIn: re.isLoggedIn });
  };

  logout = () => {
    Cookie.remove("auth_t");
    window.location = "/";
  };

  render() {
    return (
      <div>
        <header>
          <nav id="navbar">
            <h1 className="logo">
              <a href="/"> GIT-DIR</a>
            </h1>
            {this.state.isLoggedIn === false && (
              <div>
                <ul>
                  {/* <li>
                    <a href="#">Home</a>
                  </li> */}
                </ul>
              </div>
            )}
            {this.state.isLoggedIn === true && (
              <div>
                <ul>
                  <li>
                    <a href="/">Home</a>
                  </li>
                  <li>
                    <a href="/userProfile">
                      <strong> {this.state.details.name}</strong>
                    </a>
                  </li>
                  <li>
                    <a href="#" onClick={this.logout}>
                      logout
                    </a>
                  </li>
                </ul>
              </div>
            )}
          </nav>
        </header>
      </div>
    );
  }
}

export default Navbar;
