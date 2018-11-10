import React, { Component } from "react";
import { connectedRouterRedirect } from "redux-auth-wrapper/history4/redirect";
import locationHelperBuilder from "redux-auth-wrapper/history4/locationHelper";
import history from "../browserHistory";
import { LIST_PATH } from "../constants";
import LoadingSpinner from "../routes/LoadingSpinner";

const AUTHED_REDIRECT = "AUTHED_REDIRECT";
const UNAUTHED_REDIRECT = "UNAUTHED_REDIRECT";

const locationHelper = locationHelperBuilder({});
/**
 * @description Higher Order Component that redirects to `/login` instead
 * rendering if user is not authenticated (default of redux-auth-wrapper).
 * @param {Component} componentToWrap - Component to wrap
 * @return {Component} wrappedComponent
 */
// export const UserIsAuthenticated = connectedRouterRedirect({
//   wrapperDisplayName: "UserIsAuthenticated",
//   AuthenticatingComponent: LoadingSpinner,
//   allowRedirectBack: true,
//   redirectPath: (state, ownProps) =>
//     locationHelper.getRedirectQueryParam(ownProps) || "/",
//   authenticatingSelector: ({ firebase: { auth, isInitializing } }) =>
//     !auth.isLoaded || isInitializing,
//   authenticatedSelector: ({ firebase: { auth } }) =>
//     auth.isLoaded && !auth.isEmpty,
//   redirectAction: newLoc => dispatch => {
//     alert("dasds");
//     history.replace(newLoc);
//     dispatch({
//       type: UNAUTHED_REDIRECT,
//       payload: { message: "User is not authenticated." }
//     });
//   }
// });

/**
 * @description Higher Order Component that redirects to listings page or most
 * recent route instead rendering if user is not authenticated. This is useful
 * routes that should not be displayed if a user is logged in, such as the
 * login route.
 * @param {Component} componentToWrap - Component to wrap
 * @return {Component} wrappedComponent
 */
export const UserIsNotAuthenticated = connectedRouterRedirect({
  wrapperDisplayName: "UserIsAuthenticated",
  AuthenticatingComponent: LoadingSpinner,
  allowRedirectBack: false,
  redirectPath: (state, ownProps) =>
    locationHelper.getRedirectQueryParam(ownProps) || "/dashboard",
  authenticatingSelector: ({ firebase: { auth, isInitializing } }) =>
    !auth.isLoaded || isInitializing === true,
  authenticatedSelector: ({ firebase: { auth } }) =>
    auth.isLoaded && auth.isEmpty,
  redirectAction: newLoc => dispatch => {
    history.replace(newLoc);
    dispatch({
      type: AUTHED_REDIRECT
    });
  }
});
