import { createSlice } from "@reduxjs/toolkit";

interface AuthState {
  loggedIn: boolean;
}
const token = localStorage.getItem("token");
const isTokenExpired = (token: string | null) => {
  if (!token) {
    return true;
  }
  const payload = JSON.parse(atob(token.split(".")[1]));
  return payload.exp < Date.now() / 1000;
};

const initialState: AuthState = {
  loggedIn: !isTokenExpired(token),
};

export const auth = createSlice({
  name: "auth",
  initialState,
  reducers: {
    login: (state) => {
      state.loggedIn = true;
    },
    logout: (state) => {
      state.loggedIn = false;
    },
  },
});

export const { login, logout } = auth.actions;

export default auth.reducer;
