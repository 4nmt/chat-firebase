import React from "react";
import PropTypes from "prop-types";
import { Router, Route } from "react-router";
import { MuiThemeProvider, createMuiTheme } from "@material-ui/core/styles";
import { Provider } from "react-redux";
import ThemeSettings from "./theme";
import history from "./browserHistory";
import LoginPageComponent from "./components/Login/LoginPage";
import Signin from "./containers";

import HomePageComponent from "./components/Home";

const theme = createMuiTheme(ThemeSettings);

const App = ({ store }) => (
  <MuiThemeProvider theme={theme}>
    <Provider store={store}>
      <Router history={history}>
        <div>
          <Route path="/" exact component={LoginPageComponent} />
          <Route path="/home" exact component={HomePageComponent} />
        </div>
      </Router>
    </Provider>
  </MuiThemeProvider>
);

App.PropTypes = {
  store: PropTypes.object.isRequired
};

export default App;
