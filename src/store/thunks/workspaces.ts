import { Thunk } from 'src/utils/store';
import { actions } from '..';

const runCode = (): Thunk<void> => async dispatch => {
  // TODO: Implement
  await new Promise(resolve => setTimeout(resolve, 1000));
  dispatch(actions.evalSuccess({ location: 'playground', result: 'success' }));
};

const workspacesThunks = {
  runCode,
};

export default workspacesThunks;
