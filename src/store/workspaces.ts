import workspacesThunks from './thunks/workspaces';
import { WorkspaceLocation, WorkspacesState } from 'src/types/store/workspaces';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

const initialState: WorkspacesState = {
  playground: {},
};

const workspacesSlice = createSlice({
  name: 'workspaces',
  initialState,
  reducers: {
    evalSuccess: (
      state,
      action: PayloadAction<{ location: WorkspaceLocation; result: string }>
    ) => {
      // TODO: Implement
      state[action.payload.location].output = action.payload.result;
    },
  },
});

export const workspacesActions = {
  ...workspacesSlice.actions,
  ...workspacesThunks,
};

export default workspacesSlice.reducer;
