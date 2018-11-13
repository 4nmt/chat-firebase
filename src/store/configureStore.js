import { createStore, compose } from "redux";
import rootReducer from "../reducers";
import { reactReduxFirebase } from "react-redux-firebase";
import firebase from "firebase/app";
import "firebase/database";
import "firebase/auth";
import "firebase/storage";
import {
  FirebaseConfig as fbConfig,
  reduxFirebase as rrfConfig,
  configMetadata
} from "../config";

export default (initialState = {}) => {
  firebase.initializeApp(fbConfig);
  const store = createStore(
    rootReducer,
    reactReduxFirebase(firebase, rrfConfig, configMetadata)
  );

  return store;
};
