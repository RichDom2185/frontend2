import sicp from './sicp';
import workspaces from './workspaces';
import { combineReducers } from '@reduxjs/toolkit';

export const rootReducer = combineReducers({
  sicp,
  workspaces,
});
