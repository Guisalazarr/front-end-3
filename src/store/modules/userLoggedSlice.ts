import { createSlice } from '@reduxjs/toolkit';
interface UserLoggedState {
  name: string;
  email: string;
}

const initialState: UserLoggedState = {
  name: '',
  email: ''
};

const userLoggedSlice = createSlice({
  name: 'userLogged',
  initialState,
  reducers: {
    createUserLogged: (state, action) => action.payload,
    clearUserLogged: () => initialState
  }
});

export const { createUserLogged, clearUserLogged } = userLoggedSlice.actions;
export default userLoggedSlice.reducer;
