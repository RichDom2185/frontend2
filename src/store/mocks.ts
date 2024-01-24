import mocksThunks from './thunks/mocks';
import { createSlice } from '@reduxjs/toolkit';

const initialState: object = {};

const mocksSlice = createSlice({
  name: 'mocks',
  initialState,
  reducers: {},
});

export const mocksActions = {
  ...mocksSlice.actions,
  ...mocksThunks,
};

export default mocksSlice.reducer;
