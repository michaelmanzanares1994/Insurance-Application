import React, { Component } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";

class Landing extends Component {
  // Prevent navigation to login and register if already logged in
  componentDidMount() {
    if (this.props.authorize.isAuthenticated) {
      this.props.history.push("/dashboard");
    }
  }
  render() {
    return (
      <div className="landing">
        <div className="dark-overlay landing-inner text-light">
          <div className="container">
            <div className="row">
              <div className="col-md-12 text-center">
                <h1 className="display-3 mb-4">Insurance Website</h1>
                <p className="lead">
                  {" "}
                  Create a quote or policy quickly with this secure full stact
                  insurance website
                </p>
                <hr />
                <br /> <br /> <br /> <br />
                <Link to="/register" className="btn btn-lg btn-info mr-2">
                  Sign Up
                </Link>
                <Link to="/login" className="btn btn-lg btn-light">
                  Login
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

Landing.propTypes = {
  authorize: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  authorize: state.authorize
});

export default connect(mapStateToProps)(Landing);
