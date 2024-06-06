import { configureStore } from "@reduxjs/toolkit";
import ThemeReducer from "../Features/ThemeSlice";
import AuthReducer from "../Features/Auth/AuthSlice";

export const store = configureStore({
  reducer: {
    theme: ThemeReducer,
    auth: AuthReducer,
  },
});
