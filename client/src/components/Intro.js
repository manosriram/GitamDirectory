import React from "react";
import "./components.css";

class Intro extends React.Component {
  state = {
    errorCode: 0,
    register: 1,
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
    errorsA: []
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
    else if (designation.length < 3)
      errors.push({ msg: "Designation must be atleast 4 characters long." });
    else if (gender === "") errors.push({ msg: "Please Select Your Gender." });
    else if (date === "") errors.push({ msg: "Date required" });
    if (errors.length > 0) this.setState({ errorCode: 1, errorsA: errors });
    // else make post request and create an account by verifying the email..
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
            <br />
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
        <div className="form" onChange={this.handleChange}>
          {this.state.errorsA.length > 0 && (
            <div className="alert alert-danger">
              {this.state.errorsA.map((el, ind) => {
                return <h3>{el.msg}</h3>;
              })}
            </div>
          )}
          <div class="cardReg">
            <div class="card-body">
              <strong>
                <h4 class="card-title">
                  Register to Gitam Directory. Its Free!
                </h4>
              </strong>
              <form id="registerForm">
                <input type="text" placeholder="Name" id="pass" name="name" />
                <input
                  type="email"
                  placeholder="Gitam Email Address"
                  id="pass"
                  name="email"
                />
                <br />
                <br />
                <input
                  type="password"
                  placeholder="Password"
                  id="pass"
                  name="pass"
                />
                <input
                  type="password"
                  placeholder="Confirm Password"
                  id="pass"
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
            </div>
          </div>
        </div>
      );
    }
  }
}

export default Intro;
