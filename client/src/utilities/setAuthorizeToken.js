// This file takes care of adding the authorization token
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
