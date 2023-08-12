import { configureStore, combineReducers } from "@reduxjs/toolkit";
import { reAuth } from "./auth";

export const store = configureStore({
  reducer: combineReducers({
    auth: reAuth,
  }),
});
