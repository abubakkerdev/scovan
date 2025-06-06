import { configureStore } from "@reduxjs/toolkit";
import userSlice from "../features/user/userSlice";

export default configureStore({
  reducer: {
    userInfo: userSlice,
  },
  devTools: false,
});
