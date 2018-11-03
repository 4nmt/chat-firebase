import React from "react";
import Appbar from "../../containers/Appbar";
import Chat from "../Chat";

export const HomePage = (...props) => (
  <div>
    <Appbar />
    <Chat {...props} />
  </div>
);

export default HomePage;
