import { configureStore } from "@reduxjs/toolkit";
import ThemeReducer from "../Features/Theme/ThemeSlice";
import AuthReducer from "../Features/Auth/AuthSlice";
import ProductReducer from "../Features/Products/ProductSlice";

export const store = configureStore({
  reducer: {
    theme: ThemeReducer,
    auth: AuthReducer,
    product: ProductReducer,
  },
});
