// This file takes care of adding the token to the authorization header for local storage
import axios from "axios";

const setAuthorizeToken = token => {
  // If there is a token
  if (token) {
    // Apply to every request
    axios.defaults.headers.common["Authorization"] = token;
  } else {
    delete axios.defaults.headers.common["Authorization"];
  }
};

export default setAuthorizeToken;
