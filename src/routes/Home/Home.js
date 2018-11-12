import React from "react";
import Appbar from "../../containers/Appbar";
import Chat from "../Chat";
import CssBaseline from "@material-ui/core/CssBaseline";

const HomePage = (...props) => {
  props[0].setOnlineStatus();
  return (
    <React.Fragment>
      <CssBaseline />
      <Appbar />
      <Chat {...props} />
    </React.Fragment>
  );
};

export default HomePage;
