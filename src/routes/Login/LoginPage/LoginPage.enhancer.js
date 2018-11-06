import { withHandlers, pure, compose } from "recompose";
import { firebaseConnect } from "react-redux-firebase";
import { UserIsNotAuthenticated } from "../../../utils/router";

export default compose(
  UserIsNotAuthenticated,
  firebaseConnect(), // add props.firebase
  // Handlers as props
  withHandlers({
    onSubmitFail: props => (formErrs, dispatch, err) =>
      props.showError(formErrs ? "Form Invalid" : err.message || "Error"),
    googleLogin: ({ firebase, showError, router }) => event =>
      firebase
        .login({ provider: "google", type: "popup" })
        .catch(err => "aaaaaa"),
    emailLogin: ({ firebase, router, showError }) => creds =>
      firebase.login(creds).catch(err => "aaaaaa")
  }),
  pure // shallow equals comparison on props (prevent unessesary re-renders)
);
