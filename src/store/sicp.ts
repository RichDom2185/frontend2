import sicpThunks from './thunks/sicp';
import { createSlice } from '@reduxjs/toolkit';

const initialState: object = {};

const sicpSlice = createSlice({
  name: 'sicp',
  initialState,
  reducers: {},
});

export const sicpActions = {
  ...sicpSlice.actions,
  ...sicpThunks,
};

export default sicpSlice.reducer;
