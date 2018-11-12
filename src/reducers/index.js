import { combineReducers } from "redux";
import { firebaseReducer as firebase } from "react-redux-firebase";
import { reducer as form } from "redux-form";

// Add firebase to reducers
const rootReducer = combineReducers({
  firebase
});

export default rootReducer;
