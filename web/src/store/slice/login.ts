import { createSlice } from "@reduxjs/toolkit";
interface loginModalState {
  show: boolean;
}

const initialState: loginModalState = {
  show: false,
};
export const loginModal = createSlice({
  name: "loginModal",
  initialState,
  reducers: {
    showLogin(state) {
      state.show = true;
    },
    hideLogin(state) {
      state.show = false;
    },
  },
});

export const { showLogin, hideLogin } = loginModal.actions;

export default loginModal.reducer;
