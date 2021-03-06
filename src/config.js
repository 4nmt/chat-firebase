import firebase from "firebase/app";
import "firebase/database";
import "firebase/auth";
import "firebase/storage";

export const env = "development";

// Config from Firebase Console
export const FirebaseConfig = {
  apiKey: "AIzaSyA0OXVWBo3AEjp6qgGb5v8jhmV68kp8v3I",
  authDomain: "chat-react-659b2.firebaseapp.com",
  databaseURL: "https://chat-react-659b2.firebaseio.com",
  projectId: "chat-react-659b2",
  storageBucket: "chat-react-659b2.appspot.com",
  messagingSenderId: "1086217748217"
};

export const configMetadata = {
  fileMetadataFactory: uploadRes => {
    // upload response from Firebase's storage upload
    const {
      metadata: { name, fullPath, downloadURLs }
    } = uploadRes;
    // default factory includes name, fullPath, downloadURL
    return {
      name,
      fullPath,
      downloadURL: downloadURLs[0]
    };
  }
};

// Config for react-redux-firebase
// For more details, visit http://docs.react-redux-firebase.com/history/v2.0.0/docs/api/enhancer.html
export const reduxFirebase = {
  userProfile: "users" // root that user profiles are written to
};

export default { env, firebase, reduxFirebase };
