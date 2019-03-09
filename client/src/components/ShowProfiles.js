import React from "react";
import "./searchUser.css";
import Spinner from "react-spinner-material";

class ShowProfiles extends React.Component {
  state = {
    query: "",
    resultantData: null,
    search: false,
    isSpinning: false
  };

  handleFormChange = e => {
    this.setState({ query: e.target.value });
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
      this.setState({ resultantData: result, search: true, isSpinning: false });
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
          ;
        </React.Fragment>
      );
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
        <React.Fragment>
          <h1>Query!!</h1>
        </React.Fragment>
      );
    }
  }
}

export default ShowProfiles;
