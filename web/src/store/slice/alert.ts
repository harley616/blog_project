import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { AppThunk } from "../store";
interface alertState {
  show: boolean;
  good: boolean;
  message: string;
}

const initialState: alertState = {
  show: false,
  good: false,
  message: "",
};

export const alertSlice = createSlice({
  name: "alert",
  initialState,
  reducers: {
    setMessage(
      state,
      action: PayloadAction<{ message: string; good: boolean }>
    ) {
      state.show = true;
      state.message = action.payload.message;
      state.good = action.payload.good;
    },
    clearMessage(state) {
      state.show = false;
      state.message = "";
    },
  },
});

export const { setMessage, clearMessage } = alertSlice.actions;

export const showMessageWithTimeout =
  (message: string): AppThunk =>
  (dispatch) => {
    dispatch(setMessage({ message: message, good: true }));
    setTimeout(() => {
      dispatch(clearMessage());
    }, 5000);
  };
export const showErrorMessageWithTimeout =
  (message: string): AppThunk =>
  (dispatch) => {
    dispatch(setMessage({ message: message, good: false }));
    setTimeout(() => {
      dispatch(clearMessage());
    }, 5000);
  };

export default alertSlice.reducer;
