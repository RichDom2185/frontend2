import 'ace-builds/src-noconflict/ace';
import 'ace-builds/src-noconflict/ext-language_tools';
import 'ace-builds/src-noconflict/mode-javascript';
import 'ace-builds/src-noconflict/theme-tomorrow_night_eighties';

import AceEditor from 'react-ace';
import React from 'react';

const Editor: React.FC = () => {
  return (
    <div style={{ display: 'flex', width: '100%', height: '100%' }}>
      <AceEditor mode="javascript" theme="tomorrow_night_eighties" width="100%" height="100%" />
    </div>
  );
};

export default Editor;
