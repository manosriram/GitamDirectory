import ShowProfiles from "./ShowProfiles";
import React from "react";
import "./components.css";
const Cookie = require("js-cookie");

class Navbar extends React.Component {
  state = {
    isLoggedIn: false,
    details: {},
    searchParameter: "",
    search: false
  };

  handleFormChange = e => {
    this.setState({ searchParameter: e.target.value });
  };

  componentDidMount = async () => {
    try {
      const res = await fetch("/auth/getUser", {
        method: "POST",
        headers: {
          Accept: "application/json, text/plain, */*",
          "Content-Type": "application/json"
        }
      });
      const re = await res.json();
      this.setState({ details: re.user1, isLoggedIn: re.isLoggedIn });
    } catch (error) {
      console.log(error);
    }
  };

  logout = () => {
    Cookie.remove("auth_t");
    window.location = "/";
  };

  render() {
    if (this.state.search === true) {
      return <ShowProfiles />;
    }
    return (
      <>
        <header>
          <nav id="navbar">
            <h1 className="logo">
              <a href="/"> GIT-DIR</a>
            </h1>

            {/* <div class="search-container">
              <form onChange={this.handleFormChange}>
                <input
                  type="text"
                  placeholder="Search.."
                  name="searchParameter"
                  id="searchParameter"
                />
                <button onClick={this.handleFormSubmit}>Submit</button>
              </form> */}

            {/* </div> */}
            <div>
              <ul>
                <li>
                  <a href="/searchUser">Search</a>
                </li>
              </ul>
            </div>

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
      </>
    );
  }
}

export default Navbar;
