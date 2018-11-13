import { combineReducers } from "redux";
import { firebaseReducer as firebase } from "react-redux-firebase";

// Add firebase to reducers
const rootReducer = combineReducers({
  firebase
});

export default rootReducer;
