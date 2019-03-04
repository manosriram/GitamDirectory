import Spinner from "react-spinner-material";
import React from "react";
import "./loggedHome.css";
import "./components.css";
const axios = require("axios");

class UserProfile extends React.Component {
  state = {
    details: {},
    isSpinning: false
  };

  componentWillMount = async () => {
    this.setState({ isSpinning: true });
    const tar1 = await axios.post("/auth/getUser");
    const tar = await tar1;
    if (tar.data.user1) {
      this.setState(
        {
          details: tar.data.user1
        },
        () => console.log(this.state.details)
      );
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
        <div class="sidenav">
          <p>{this.state.details.bio}</p>
          <h3>Works as {this.state.details.designation}</h3>
          <br />
          <h3>Lives in {this.state.details.location}</h3>
          <br />
          <h3>Is {this.state.details.age} years old.</h3>
          <br />
          <h3 id="em">{this.state.details.email}</h3>
        </div>
      );
    }

    // }
  }
}

export default UserProfile;
