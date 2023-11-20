// reducers.js
import { combineReducers } from "redux";
import rosReducer from "./ros/RosSlice";
import counterReducer from "./counter/CounterSlice";

const rootReducer = combineReducers({
  ros: rosReducer,
  counter: counterReducer,
  // Add other reducers as needed
});

export default rootReducer;
