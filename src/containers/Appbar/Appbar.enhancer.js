import { connect } from "react-redux";
import { withHandlers, compose, withProps } from "recompose";
import { withFirebase, isEmpty, isLoaded } from "react-redux-firebase";
import { withRouter } from "react-router";

export default compose(
  connect(({ firebase: { auth, profile } }) => ({
    auth,
    profile
  })),
  // Wait for auth to be loaded before going further
  //   withStateHandlers(
  //     ({ accountMenuOpenInitially = false }) => ({
  //       accountMenuOpen: accountMenuOpenInitially,
  //       anchorEl: null
  //     }),
  //     {
  //       closeAccountMenu: ({ accountMenuOpen }) => () => ({
  //         anchorEl: null
  //       }),
  //       handleMenu: () => event => ({
  //         anchorEl: event.target
  //       })
  //     }
  //   ),
  // Add props.router (used in handlers)
  withRouter,
  // Add props.firebase (used in handlers)
  withFirebase,
  // Handlers
  withHandlers({
    handleLogout: props => async () => {
      await props.firebase.logout();
      props.history.push("/");
    }
    //   goToAccount: props => () => {
    //     props.router.push("/");
    //     props.closeAccountMenu();
    //   }
  }),
  withProps(({ auth, profile }) => ({
    authExists: isLoaded(auth) && !isEmpty(auth)
  }))
  // Flatten profile so that avatarUrl and displayName are available
);
