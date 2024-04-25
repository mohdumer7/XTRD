// reducers.js
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: {},
};

const userSlice = createSlice({
  name: "example",
  initialState,
  reducers: {
    setUser(state, action) {
      state.user = action.payload;
    },
    removeUser(state, action) {
      state.user = {};
    },
  },
});

export const { setUser } = userSlice.actions;
export default userSlice.reducer;
