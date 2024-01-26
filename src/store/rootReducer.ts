import fileSystem from './fileSystem';
import mocks from './mocks';
import sicp from './sicp';
import workspaces from './workspaces';
import { combineReducers } from '@reduxjs/toolkit';

export const rootReducer = combineReducers({
  fileSystem,
  mocks,
  sicp,
  workspaces,
});
