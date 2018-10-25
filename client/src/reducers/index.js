// root reducer Combine all reducers
import { combineReducers } from "redux";
import authorizeReducer from "./authorizeReducer";
import errorReducer from "./errorReducer";

export default combineReducers({
  authorize: authorizeReducer,
  errors: errorReducer
});
