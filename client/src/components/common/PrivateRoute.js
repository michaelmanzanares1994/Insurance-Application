import React from "react";
import { Route, Redirect } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types";

const PrivateRoute = ({ component: Component, authorize, ...rest }) => (
  // If authenticated, load component. Otherwise, redirect to login
  <Route
    {...rest}
    render={props =>
      authorize.isAuthenticated === true ? (
        <Component {...props} />
      ) : (
        <Redirect to="/login" />
      )
    }
  />
);

PrivateRoute.propTypes = {
  authorize: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  authorize: state.authorize
});

export default connect(mapStateToProps)(PrivateRoute);
