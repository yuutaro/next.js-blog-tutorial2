import { configureStore } from "@reduxjs/toolkit";
import themeReducer from "./modules/themeSlice";

export default configureStore({
  reducer: {
    theme: themeReducer,
  }
});