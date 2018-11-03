import { withHandlers, pure, compose } from "recompose";
import { firebaseConnect } from "react-redux-firebase";
import { connect } from "react-redux";
import { spinnerWhileLoading } from "../../utils/component";

export default compose(
  firebaseConnect(["users"]),
  connect(({ firebase: { auth, ordered } }) => ({
    users: ordered.users,
    auth
  }))
);
