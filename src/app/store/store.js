import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./userReducer";

const store = configureStore({
  reducer: userReducer,
  // Add any additional middleware here
});

export default store;
