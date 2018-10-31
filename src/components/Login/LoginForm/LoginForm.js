import React from "react";
import { Field } from "redux-form";
import { TextField } from "redux-form-material-ui";
import Button from "@material-ui/core/Button";
import GoogleButton from "react-google-button";

export const LoginForm = () => (
  <form>
    {/* <Field name="email" component={TextField} label="Email" />
    <Field
      name="password"
      component={TextField}
      label="Password"
      type="password"
    />
    <div>
      <Button color="primary" type="submit" raised>
        "Login"
      </Button>
    </div> */}
    {/* <GoogleButton
      onClick={() => {
        console.log("Google button clicked");
      }}
    /> */}
  </form>
);

// LoginForm.propTypes = {
//   onSubmit: PropTypes.func.isRequired, // eslint-disable-line react/no-unused-prop-types
//   pristine: PropTypes.bool.isRequired, // added by redux-form
//   submitting: PropTypes.bool.isRequired, // added by redux-form
//   handleSubmit: PropTypes.func.isRequired // added by redux-form (calls onSubmit)
// };

export default LoginForm;
