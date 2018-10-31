import React, { Component } from "react";
import GoogleButton from "react-google-button";
import { connect } from "react-redux";
import history from "../browserHistory";
import { signIn } from "../actions";

class Signin extends Component {
  componentWillUpdate(nextProps) {
    if (nextProps.auth) {
      history.push("/home");
    }
  }

  render() {
    return <GoogleButton onClick={signIn} />;
  }
}

function mapStateToProps({ auth }) {
  return { auth };
}

export default connect(
  mapStateToProps,
  { signIn }
)(Signin);
