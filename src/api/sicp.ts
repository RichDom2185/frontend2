import Constants from 'src/utils/constants';
import axios from 'axios';

const getChapterData = async (chapter: string) => {
  const resp = await axios.get(`${Constants.sicpBackendUrl}/json/${chapter}.json`);
  return resp.data;
};

const sicpApi = {
  getChapterData,
};

export default sicpApi;
