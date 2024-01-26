import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { FSModule } from 'browserfs/dist/node/core/FS';

type FileSystemState = {
  inBrowserFileSystem: FSModule | null;
};

const initialState: FileSystemState = {
  inBrowserFileSystem: null,
};

const fileSystemSlice = createSlice({
  name: 'fileSystem',
  initialState,
  reducers: {
    setInBrowserFileSystem: (state, action: PayloadAction<FSModule | null>) => {
      state.inBrowserFileSystem = action.payload;
    },
  },
});

export const fileSystemActions = {
  ...fileSystemSlice.actions,
};

export default fileSystemSlice.reducer;
