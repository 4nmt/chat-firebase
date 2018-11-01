import React from "react";
import GoogleButton from "react-google-button";
import LoginForm from "../LoginForm";
import { withStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";

const styles = theme => ({
  root: {
    flexGrow: 1
  },
  paper: {
    padding: theme.spacing.unit * 2,
    textAlign: "center",
    color: theme.palette.text.secondary,
    justify: "center",
    alignItems: "center",
    margin: "100px auto"
  }
});

export const LoginPage = ({ googleLogin, classes }) => (
  <div className={classes.root}>
    <Grid container spacing={24}>
      <Paper className={classes.paper}>
        <h1>Sign In</h1>
        <LoginForm />
        <hr />
        <GoogleButton onClick={googleLogin} />
      </Paper>
    </Grid>
  </div>
);

export default withStyles(styles)(LoginPage);
