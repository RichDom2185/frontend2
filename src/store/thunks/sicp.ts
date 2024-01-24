import { api } from 'src/api';
import { JsonType } from 'src/utils/sicp';
import { Thunk } from 'src/utils/store';

const getChapterData =
  (chapter: string): Thunk<JsonType[]> =>
  async _ => {
    const json = await api.getChapterData(chapter);
    return json;
  };

const sicpThunks = {
  getChapterData,
};

export default sicpThunks;
