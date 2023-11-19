import { configureStore } from "@reduxjs/toolkit";
import counterReducer from "./counter/CounterSlice";
import rosReducer from "./ros/RosSlice";
export default configureStore({
  reducer: {
    counter: counterReducer,
    ros: rosReducer,
  },
});
