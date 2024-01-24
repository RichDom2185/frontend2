import { Thunk } from 'src/utils/store';

const getMockData = (): Thunk<string[]> => async _ => {
  // TODO: Implement
  await new Promise(resolve => setTimeout(resolve, 1000));
  return ['mock1', 'mock2'];
};

const mocksThunks = {
  getMockData,
};

export default mocksThunks;
