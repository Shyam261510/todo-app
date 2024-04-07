import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./authSlice";
import todoReducer from "./todoSlice";
const combineSlice = { todoReducer, authReducer };
export const store = configureStore({
  reducer: combineSlice,
});
