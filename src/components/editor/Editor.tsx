import 'ace-builds/src-noconflict/ace';
import 'ace-builds/src-noconflict/ext-language_tools';
import 'ace-builds/src-noconflict/mode-javascript';
import 'ace-builds/src-noconflict/theme-twilight';

import AceEditor from 'react-ace';
import React, { useImperativeHandle, useRef, useState } from 'react';

export type ImperativeEditor = {
  getCode: () => string;
};

const EditorComponent: React.ForwardRefRenderFunction<ImperativeEditor> = (_, editorRef) => {
  const [code, setCode] = useState('');
  const ref = useRef<AceEditor>(null);

  useImperativeHandle<ImperativeEditor, ImperativeEditor>(editorRef, () => ({
    getCode: () => ref.current?.editor?.getValue() ?? '',
  }));

  return (
    <div style={{ display: 'flex', width: '100%', height: '100%' }}>
      <AceEditor
        ref={ref}
        mode="javascript"
        theme="twilight"
        fontSize={14}
        width="100%"
        height="100%"
        value={code}
        onChange={setCode}
      />
    </div>
  );
};

const Editor = React.forwardRef(EditorComponent);
Editor.displayName = 'Editor';

export default Editor;
