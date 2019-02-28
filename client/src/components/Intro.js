import React from "react";
import "./components.css";

class Intro extends React.Component {
  state = {
    register: 1
  };

  handleLogin = e => {
    e.preventDefault();
    this.setState({ register: 1 });
  };
  render() {
    if (this.state.register === 0) {
      return (
        <div class="card">
          <div class="card-body">
            <strong>
              <h2 class="card-title">Login to Gitam Directory.</h2>
            </strong>
            <form id="loginForm">
              <input type="email" placeholder="Email Address" />
              <br />
              <br />
              <input type="password" placeholder="Password" />
              <br />
              <br />
              <input type="submit" value="Login" id="loginButton" />
            </form>
            <label>
              Don't have an account? register{" "}
              <a href="" onClick={this.handleLogin}>
                here
              </a>
            </label>
          </div>
        </div>
      );
    }
    if (this.state.register === 1) {
      return (
        <div>
          <div class="cardReg">
            <div class="card-body">
              <strong>
                <h2 class="card-title">Register to Gitam Directory.</h2>
              </strong>
              <form id="registerForm">
                <input type="text" placeholder="Name" id="pass" />
                <input
                  type="email"
                  placeholder="Gitam Email Address"
                  id="pass"
                />
                <br />
                <br />
                <input type="password" placeholder="Password" id="pass" />
                <input
                  type="password"
                  placeholder="Confirm Password"
                  id="pass"
                />
                <br />
                <br />
                <input type="text" placeholder="Degree Undertaken" id="pass" />
                <input
                  type="number"
                  max="5"
                  min="1"
                  placeholder="Year of Study"
                  id="pass"
                />
                <br />
                <br />
                <input type="text" placeholder="Section" id="pass" />

                <input
                  type="number"
                  name=""
                  id="pass"
                  placeholder="Roll Number"
                />
                <br />
                <br />
                <div>
                  <label id="gen">You are </label>
                  <select name="gender" id="gender">
                    <option value="" selected disabled hidden>
                      Choose
                    </option>
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                  </select>
                </div>
                <br />
                <input type="text" placeholder="Location" />
                <br />
                <br />
                <input
                  type="number"
                  max="118"
                  min="16"
                  placeholder="Age"
                  name="Age"
                />
                <br />
                <label>Date of Birth</label>
                <br />
                <input type="date" placeholder="BirthDate" />
                <br />
                <br />
                <input type="submit" value="Register" id="loginButton" />
              </form>
            </div>
          </div>
        </div>
      );
    }
  }
}

export default Intro;
