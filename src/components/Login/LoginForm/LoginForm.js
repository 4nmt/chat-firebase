import React from "react";
import { Field } from "redux-form";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";

export const LoginForm = ({ handleSubmit, pristine, reset, submitting }) => (
  <form onSubmit={handleSubmit}>
    <div>
      <Field name="email" component={TextField} label="Email" />
    </div>
    <div>
      <Field
        name="password"
        component={TextField}
        label="Password"
        type="password"
      />
    </div>
    <div>
      <Button color="primary" type="submit" raised="true">
        Login
      </Button>
    </div>{" "}
  </form>
);

// LoginForm.propTypes = {
//   onSubmit: PropTypes.func.isRequired, // eslint-disable-line react/no-unused-prop-types
//   pristine: PropTypes.bool.isRequired, // added by redux-form
//   submitting: PropTypes.bool.isRequired, // added by redux-form
//   handleSubmit: PropTypes.func.isRequired // added by redux-form (calls onSubmit)
// };

export default LoginForm;
