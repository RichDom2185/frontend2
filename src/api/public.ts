import Constants from 'src/utils/constants';
import axios from 'axios';

const getHealth = async () => {
  const resp = await axios.get(Constants.backendUrl);
  return resp.data as string;
};

const publicApi = {
  getHealth,
};

export default publicApi;
