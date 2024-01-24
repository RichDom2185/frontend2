import { rootReducer } from './rootReducer';
import { sicpActions } from './sicp';
import { workspacesActions } from './workspaces';
import { configureStore } from '@reduxjs/toolkit';

export const store = configureStore({
  reducer: rootReducer,
  middleware: getDefaultMiddleware => {
    return getDefaultMiddleware({ serializableCheck: false });
  },
});

export const actions = {
  ...sicpActions,
  ...workspacesActions,
};

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
