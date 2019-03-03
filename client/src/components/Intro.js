import React from "react";
import "./components.css";
import LoggedHome from "./LoggedHome";

class Intro extends React.Component {
  state = {
    errorCode: 0,
    register: 0,
    isStudent: false,
    name: "",
    email: "",
    pass: "",
    confirmPass: "",
    gender: "",
    degree: "",
    section: "",
    year: -1,
    date: "",
    roll: "",
    location: "",
    age: 0,
    designation: "",
    errorsA: [],
    isRegistered: -1,
    isLoggedIn: -1,
    loggedEmail: ""
  };

  componentDidMount = async () => {
    const det = await fetch("/auth/getLoginStatus", {
      method: "POST",
      headers: {
        Accept: "application/json, text/plain, */*",
        "Content-Type": "application/json"
      }
    });
    var tar = await det.json();
    if (tar.data.email) {
      this.setState({ loggedEmail: tar.data.email, isLoggedIn: 1 });
    }
  };

  handleLoginChange = async e => {
    e.preventDefault();

    const { email, password } = this.state;
    const load = { email: email, password: password };
    const res = await fetch("/auth/login", {
      method: "POST",
      headers: {
        Accept: "application/json, text/plain, */*",
        "Content-Type": "application/json"
      },
      body: JSON.stringify(load)
    });
    const resJ = await res.json();
    this.setState({ isLoggedIn: resJ.done });
  };

  handleLogin = e => {
    e.preventDefault();
    this.setState({ register: 1 });
  };

  handleCheck = () => {
    this.setState({ isStudent: !this.state.isStudent });
  };

  handleChange = e => {
    this.setState({
      [e.target.name]: e.target.value
    });
  };

  handleRegisterSubmit = e => {
    e.preventDefault();
    var errors = [];
    var {
      name,
      email,
      pass,
      confirmPass,
      gender,
      degree,
      section,
      year,
      date,
      roll,
      location,
      age,
      designation
    } = this.state;

    let splitE = email.split("@");

    if (splitE[1] !== "gitam.in")
      errors.push({ msg: "Only Gitam Mail allowed.." });

    if (pass !== confirmPass) errors.push({ msg: "Passwords Don't Match." });
    else if (name.length < 4)
      errors.push({ msg: "Name must be atleast 4 characters long." });
    else if (pass.length < 5 || confirmPass.length < 5)
      errors.push({ msg: "Password must be atleast 5 characters long." });
    else if (degree.length < 4 && this.state.isStudent === true)
      errors.push({ msg: "Degree must be atleast 4 characters long." });
    else if (location.length < 4)
      errors.push({ msg: "Location must be atleast 4 characters long." });
    else if (roll.length !== 12 && this.state.isStudent === true)
      errors.push({ msg: "Roll Number must be exactly 12 characters long." });
    else if (section.length > 4 && this.state.isStudent === true)
      errors.push({
        msg: "Section must not be greater than 4 characters long."
      });
    else if (age < 16) errors.push({ msg: "Age requirements not satisfied." });
    else if (designation.length < 3 && !this.state.isStudent)
      errors.push({ msg: "Designation must be atleast 4 characters long." });
    else if (gender === "") errors.push({ msg: "Please Select Your Gender." });
    else if (date === "") errors.push({ msg: "Date required" });
    if (errors.length > 0) this.setState({ errorCode: 1, errorsA: errors });
    else this.setState({ errorCode: 0 });

    // else make post request and create an account by verifying the email..
    var userInformation = {
      name,
      email,
      pass,
      confirmPass,
      gender,
      degree,
      section,
      year,
      date,
      roll,
      location,
      age,
      designation,
      isStudent: this.state.isStudent
    };

    fetch("/auth/register", {
      method: "POST",
      headers: {
        Accept: "application/json, text/plain, */*",
        "Content-Type": "application/json"
      },
      body: JSON.stringify(userInformation)
    })
      .then(res => res.json())
      .then(res =>
        this.setState({ isRegistered: res.done }, () => {
          if (this.state.register === 1) this.setState({ register: 0 });
        })
      );
  };

  render() {
    if (this.state.isLoggedIn === 1) {
      return <LoggedHome />;
    }

    if (this.state.register === 0) {
      return (
        <div class="card">
          <div class="card-body">
            <strong>
              <h2 class="card-title">Login to Gitam Directory.</h2>
            </strong>
            <form id="loginForm" onChange={this.handleChange}>
              <input type="email" placeholder="Email Address" name="email" />
              <br />
              <br />
              <input type="password" placeholder="Password" name="password" />
              <br />
              <br />
              <input
                type="submit"
                value="Login"
                id="loginButton"
                onClick={this.handleLoginChange}
              />
            </form>
            <br />
            <br />
            <label>
              Don't have an account? register{" "}
              <a href="" onClick={this.handleLogin}>
                here
              </a>
            </label>
            {this.state.isLoggedIn === 0 && <h4>not known..</h4>}
          </div>
        </div>
      );
    }
    if (this.state.register === 1) {
      return (
        <div className="form" onChange={this.handleChange} id="divError">
          <div class="cardReg">
            <div class="card-body">
              <strong>
                <h4 class="card-title">
                  Register to Gitam Directory. Its Free!
                </h4>
              </strong>
              <form id="registerForm">
                <input
                  type="text"
                  placeholder="Name"
                  className="pass"
                  name="name"
                />
                <input
                  type="email"
                  placeholder="Gitam Email Address"
                  className="pass"
                  name="email"
                />
                <br />
                <br />
                <input
                  type="password"
                  placeholder="Password"
                  className="pass"
                  name="pass"
                />
                <input
                  type="password"
                  placeholder="Confirm Password"
                  className="pass"
                  name="confirmPass"
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
                  <br />
                </div>

                <label class="checkbox-inline">
                  Are you a Student ?{" "}
                  <input
                    type="checkbox"
                    value=""
                    id="check"
                    onClick={this.handleCheck}
                  />
                </label>
                <br />

                {this.state.isStudent === true && (
                  <div>
                    <input
                      type="text"
                      placeholder="Degree Undertaken"
                      id="pass"
                      name="degree"
                    />
                    <input
                      type="number"
                      max="5"
                      min="1"
                      placeholder="Year of Study"
                      id="pass"
                      name="year"
                    />
                    <br />
                    <br />
                    <input
                      type="text"
                      placeholder="Section"
                      id="pass"
                      name="section"
                    />
                    <input
                      type="number"
                      name="roll"
                      id="pass"
                      placeholder="Roll Number"
                    />
                    <br />
                  </div>
                )}

                {this.state.isStudent === false && (
                  <div>
                    <input
                      type="text"
                      placeholder="Designation at Gitam"
                      name="designation"
                    />
                  </div>
                )}

                <br />
                <input
                  type="text"
                  placeholder="Where do u live ?"
                  name="location"
                />
                <br />
                <br />
                <input
                  type="number"
                  max="118"
                  min="16"
                  placeholder="Age"
                  name="age"
                />
                <br />
                <label>Date of Birth</label>
                <br />
                <input type="date" placeholder="BirthDate" name="date" />
                <br />
                <br />
                <input
                  type="submit"
                  value="Register"
                  id="loginButton"
                  onClick={this.handleRegisterSubmit}
                />
              </form>
              <br />
              {this.state.errorsA.length > 0 && this.state.errorCode === 1 && (
                <div className="alert alert-danger" id="divEr">
                  <h2>Please Fill all the Details.</h2>
                </div>
              )}
            </div>
          </div>
        </div>
      );
    }
  }
}

export default Intro;
