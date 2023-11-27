// rosSlice.js
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  ros: new window.ROSLIB.Ros(), // Your ROS connection object
  isConnected: false,
};

const rosSlice = createSlice({
  name: "ros",
  initialState,
  reducers: {
    setRos: (state, action) => {
      state.ros = action.payload;
      state.isConnected = !!action.payload;
    },
  },
});

export const { setRos } = rosSlice.actions;
export const selectRos = (state) => state.ros.ros;
export const selectRosConnectionStatus = (state) => state.ros.isConnected;

export default rosSlice.reducer;
