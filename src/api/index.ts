import publicApi from './public';
import sicpApi from './sicp';

export const api = {
  ...publicApi,
  ...sicpApi,
};
