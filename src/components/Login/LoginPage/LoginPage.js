import React from "react";
import GoogleButton from "react-google-button";

export const LoginPage = ({ googleLogin }) => (
  <form>
    <GoogleButton onClick={googleLogin} />
  </form>
);

export default LoginPage;
