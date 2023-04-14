
import { createSlice, createEntityAdapter } from '@reduxjs/toolkit';
import { RootState } from '../index';
import ErrandsType from '../../types/ErrandsType';

const adapter = createEntityAdapter<ErrandsType>({
  selectId: item => item.id
});

export const { selectAll, selectById, selectTotal } = adapter.getSelectors((state: RootState) => state.errands);

const errandsSlice = createSlice({
  name: 'contacts',
  initialState: adapter.getInitialState(),
  reducers: {
    addErrands: adapter.addOne,
    updateErrands: adapter.updateOne,
    removeErrands: adapter.removeOne
  }
});

export const { addErrands, removeErrands, updateErrands } = errandsSlice.actions;
export default errandsSlice.reducer;
