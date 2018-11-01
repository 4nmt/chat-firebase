import React, { Component } from "react";
import PropTypes from "prop-types";

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
