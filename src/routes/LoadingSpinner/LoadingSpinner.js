import React from "react";
import PropTypes from "prop-types";
import CircularProgress from "@material-ui/core/CircularProgress";

export const LoadingSpinner = ({ size }) => (
  <div style={{ margin: "auto" }}>
    <CircularProgress mode="indeterminate" size={size || 80} />
  </div>
);

LoadingSpinner.propTypes = {
  size: PropTypes.number
};

export default LoadingSpinner;
