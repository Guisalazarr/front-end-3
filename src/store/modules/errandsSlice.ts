import { createSlice, createEntityAdapter } from '@reduxjs/toolkit';
import { RootState } from '../index';
import ErrandsType from '../../types/ErrandsType';

const adapter = createEntityAdapter<ErrandsType>({
  selectId: item => item.id
});

export const { selectAll, selectById, selectTotal } = adapter.getSelectors((state: RootState) => state.errands);

const errandsSlice = createSlice({
  name: 'errands',
  initialState: adapter.getInitialState(),
  reducers: {
    addErrands: adapter.addOne,
    updateErrands: adapter.updateOne,
    removeErrands: adapter.removeOne,
    setAllErrands: adapter.setAll,
    removeAllErrands: adapter.removeAll
  }
});

export const { removeErrands, addErrands, updateErrands, setAllErrands, removeAllErrands } = errandsSlice.actions;
export default errandsSlice.reducer;
