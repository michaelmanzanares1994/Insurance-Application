// root reducer Combine all reducers
import { combineReducers } from "redux";
import authorizeReducer from "./authorizeReducer";
import errorReducer from "./errorReducer";
import profileReducer from "./profileReducer";

export default combineReducers({
  authorize: authorizeReducer,
  profile: profileReducer,
  errors: errorReducer
});
