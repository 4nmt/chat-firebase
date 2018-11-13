import { branch, renderComponent } from "recompose";
import LoadingSpinner from "../routes/LoadingSpinner";
import { isLoaded } from "react-redux-firebase";
import { some } from "lodash";

export const spinnerWhile = condition =>
  branch(condition, renderComponent(LoadingSpinner));

export const spinnerWhileLoading = propNames =>
  spinnerWhile(props =>
    some(propNames, name => {
      return !isLoaded(props[name]);
    })
  );
