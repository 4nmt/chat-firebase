import { reduxForm } from "redux-form";
import LoginForm from "./LoginForm";

export default reduxForm({
  form: "LOGIN_FORM"
})(LoginForm);
