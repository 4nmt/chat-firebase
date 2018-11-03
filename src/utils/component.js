import React, { Component } from "react";
import PropTypes from "prop-types";
import { branch, renderComponent } from "recompose";
import LoadingSpinner from "../components/LoadingSpinner";
import { isLoaded } from "react-redux-firebase";
import { get, some } from "lodash";

export const spinnerWhile = condition =>
  branch(condition, renderComponent(LoadingSpinner));

export const spinnerWhileLoading = propNames =>
  spinnerWhile(props => some(propNames, name => !isLoaded(get(props, name))));

export const createWithFromContext = withVar => WrappedComponent => {
  class WithFromContext extends Component {
    render() {
      const props = { [withVar]: this.context[withVar] };
      if (this.context.store && this.context.store.dispatch) {
        props.dispatch = this.context.store.dispatch;
      }
      return <WrappedComponent {...this.props} {...props} />;
    }
  }

  WithFromContext.contextTypes = {
    [withVar]: PropTypes.object.isRequired
  };

  return WithFromContext;
};

export const withRouter = createWithFromContext("router");

/**
 * HOC that adds store to props
 * @return {HigherOrderComponent}
 */
export const withStore = createWithFromContext("store");
