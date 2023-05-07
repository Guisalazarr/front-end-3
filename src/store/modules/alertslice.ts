import { createSlice } from '@reduxjs/toolkit';

export type alertState = {

  open: boolean
  feedback: 'success' | 'error'
  msg: string
};

const initialState: alertState = {

  open: false,
  feedback: 'success',
  msg: ''
};

const alertSlice = createSlice({
  name: 'alert',
  initialState,
  reducers: {
    createAlertSlice: (state, action) => action.payload,
    clearAlertSlice: () => initialState
  }
});

export const { createAlertSlice, clearAlertSlice } = alertSlice.actions;
export default alertSlice.reducer;