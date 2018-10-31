import { createStore, applyMiddleware, compose } from "redux";
import rootReducer from "../reducers";
import thunk from "redux-thunk";
import {
  reactReduxFirebase,
  getFirebase,
  firebase
} from "react-redux-firebase";
import { firebase as fbConfig, reduxFirebase as rrfConfig } from "../config";
import "firebase/database";
import "firebase/auth";
import "firebase/storage";

export default (initialState = {}) => {
  const middleware = [
    thunk.withExtraArgument(getFirebase)
    // This is where you add other middleware like redux-observable
  ];

  // const enhancers = []
  // if (__DEV__) {
  //     const devToolsExtension = window.devToolsExtension
  //     if (typeof devToolsExtension === 'function') {
  //         enhancers.push(devToolsExtension())
  //     }
  // }

  firebase.initializeApp(fbConfig);

  const store = createStore(
    rootReducer,
    initialState,
    compose(
      applyMiddleware(...middleware),
      reactReduxFirebase(firebase, rrfConfig),
      window.__REDUX_DEVTOOLS_EXTENSION__ &&
        window.__REDUX_DEVTOOLS_EXTENSION__()
    )
  );

  return store;
};
