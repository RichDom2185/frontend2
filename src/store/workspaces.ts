import { WorkspaceLocation, WorkspacesState } from 'src/types/store/workspaces';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

const initialState: WorkspacesState = {
  playground: {},
};

const workspacesSlice = createSlice({
  name: 'workspaces',
  initialState,
  reducers: {
    runCode: (state, action: PayloadAction<WorkspaceLocation>) => {
      // TODO: Implement
      state[action.payload].output = 'Running...';
    },
  },
});

export const workspacesActions = workspacesSlice.actions;

export default workspacesSlice.reducer;
