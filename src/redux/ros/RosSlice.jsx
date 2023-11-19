import { createSlice } from "@reduxjs/toolkit";

export const RosSlice = createSlice({
  name: "ros",
  initialState: {
    value: 0,
  },
  reducers: {
    on: (state) => {
      state.value = 1;
    },
    off: (state) => {
      state.value = 0;
    },
  },
});

export const { on, off } = RosSlice.actions;

// The function below is called a selector and allows us to select a value from
// the state. Selectors can also be defined inline where they're used instead of
// in the slice file. For example: `useSelector((state) => state.counter.value)`
export const selectRos = (state) => state.ros.value;

export default RosSlice.reducer;
