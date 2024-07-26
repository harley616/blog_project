import { createSlice, Dispatch } from "@reduxjs/toolkit";
import call from "../api";

export type PostType = {
  _id: string;
  title: string;
  body: string;
  date: number;
};

interface PostsState {
  posts: PostType[];
}

const initialState: PostsState = {
  posts: [],
};

export const postsSlice = createSlice({
  name: "posts",
  initialState,
  reducers: {
    setPosts: (state, action) => {
      state.posts = action.payload;
    },
  },
});

export const { setPosts } = postsSlice.actions;

export const loadPosts = () => {
  return async (dispatch: Dispatch) => {
    const response = await call("GET", "/posts");
    dispatch(setPosts(response));
  };
};

export default postsSlice.reducer;
