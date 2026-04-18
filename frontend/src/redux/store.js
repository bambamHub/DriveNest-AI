// redux/store.js
import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./authSlice";
import folderReducer from "./folderSlice";
import fileReducer from "./fileSlice";

export default configureStore({
  reducer: {
    auth: authReducer,
    folder: folderReducer,
    file: fileReducer,
  },
});