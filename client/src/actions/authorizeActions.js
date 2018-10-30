import axios from "axios";
import { GET_ERRORS, SET_CURRENT_USER } from "./types";
import setAuthorizeToken from "../utilities/setAuthorizeToken";
import jwt_decode from "jwt-decode";

// Register user (by posting to uri)
export const registerUser = (userData, history) => dispatch => {
  axios
    .post("/api/users/register", userData)
    // redirect user to login
    .then(res => history.push("/login"))
    .catch(error =>
      // Call errors reducer
      dispatch({
        type: GET_ERRORS,
        payload: error.response.data
      })
    );
};

// Login Get user token
export const loginUser = userData => dispatch => {
  axios
    .post("/api/users/login", userData)
    .then(res => {
      // Save to local storage
      const { token } = res.data;
      // Set token to local storage
      localStorage.setItem("jwtToken", token);
      // Set token to authorization header
      setAuthorizeToken(token);
      // Decode token to get user date
      const decoded = jwt_decode(token);
      // Set current user
      dispatch(setCurrentUser(decoded)); //1
    })
    .catch(error =>
      dispatch({
        type: GET_ERRORS,
        payload: error.response.data
      })
    );
};

// Set logged in user
export const setCurrentUser = decoded => {
  return {
    type: SET_CURRENT_USER,
    payload: decoded
  };
};

// Log user out
export const logoutUser = () => dispatch => {
  // Remove token from local storage
  localStorage.removeItem("jwtToken");
  // pass false to auth token, to remove authorization header for future requests
  setAuthorizeToken(false);
  // Set current user to an empty object, which sets isAuthenticated to false
  dispatch(setCurrentUser({}));
};
