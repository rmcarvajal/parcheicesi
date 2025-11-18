import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../features/authSlice";
import postsReducer from "../features/postSlice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    posts: postsReducer,
  },
});

// ------------------------------
// TYPES PARA REDUX TOOLKIT
// ------------------------------

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
