import { Action, configureStore, ThunkAction } from "@reduxjs/toolkit";
import authReducer from "./slice/auth";
import loginModal from "./slice/login";
import alertSlice from "./slice/alert";
import postsSlice from "./slice/posts";

export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;

export const store = configureStore({
  reducer: {
    auth: authReducer,
    login: loginModal,
    alert: alertSlice,
    posts: postsSlice,
  },
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
