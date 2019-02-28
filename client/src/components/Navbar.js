import React from "react";
import "./components.css";

class Navbar extends React.Component {
  render() {
    return (
      <div>
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
          <a className="navbar-brand" href="/" id="navI">
            Home
          </a>
        </nav>
      </div>
    );
  }
}

export default Navbar;
