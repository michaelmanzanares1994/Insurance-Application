import axios from "axios";
import { GET_ERRORS } from "./types";

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

export const loginUser = userData => dispatch => {};
