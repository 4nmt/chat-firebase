import React from "react";
import PropTypes from "prop-types";
import { browserHistory, Router } from "react-router";
import { MuiThemeProvider, createMuiTheme } from "@material-ui/core/styles";
import { Provider } from "react-redux";
import ThemeSettings from "./theme";

const theme = createMuiTheme(ThemeSettings);

const App = ({ store }) => (
  <MuiThemeProvider theme={theme}>
    <Provider store={store}>
      <Router history={browserHistory} />
    </Provider>
  </MuiThemeProvider>
);

App.PropTypes = {
  store: PropTypes.object.isRequired
};

export default App;
