import React from "react";
import PropTypes from "prop-types";
import { Router, Route } from "react-router";
import { MuiThemeProvider, createMuiTheme } from "@material-ui/core/styles";
import { Provider } from "react-redux";
import ThemeSettings from "./theme";
import history from "./browserHistory";
import LoginPageComponent from "./components/Login/LoginPage";

import HomePageComponent from "./components/Home";

const muiTheme = createMuiTheme(ThemeSettings);

const App = ({ store }) => (
  <Provider store={store}>
    <MuiThemeProvider theme={muiTheme}>
      <Router history={history}>
        <div>
          <Route path="/" exact component={LoginPageComponent} />
          <Route path="/dashboard" component={HomePageComponent} />
        </div>
      </Router>
    </MuiThemeProvider>
  </Provider>
);

App.PropTypes = {
  store: PropTypes.object.isRequired
};

export default App;
