import { createSlice, createEntityAdapter } from '@reduxjs/toolkit';
import { RootState } from '../index';
import RegisterType from '../../types/RegisterType';

const adapter = createEntityAdapter<RegisterType>({
  selectId: item => item.email
});

export const { selectAll: selectAllRegister, selectById, selectTotal } = adapter.getSelectors((state: RootState) => state.register);

const registerSlice = createSlice({
  name: 'register',
  initialState: adapter.getInitialState(),
  reducers: {
    addRegister: adapter.addOne,
    updateRegister: adapter.updateOne,
  }
});

export const { addRegister, updateRegister, } = registerSlice.actions;
export default registerSlice.reducer;
