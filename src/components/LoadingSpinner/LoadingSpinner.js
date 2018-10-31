import React from "react";
import PropTypes from "prop-types";
import CircularProgress from "@material-ui/core/CircularProgress";

export const LoadingSpinner = ({ size }) => (
  <div>
    <div>
      <CircularProgress mode="indeterminate" size={size || 80} />
    </div>
  </div>
);

LoadingSpinner.propTypes = {
  size: PropTypes.number
};

export default LoadingSpinner;
