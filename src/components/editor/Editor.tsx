import 'ace-builds/src-noconflict/ace';
import 'ace-builds/src-noconflict/ext-language_tools';
import 'ace-builds/src-noconflict/mode-javascript';
import 'ace-builds/src-noconflict/theme-twilight';

import FileSystemView from '../fileSystemView/FileSystemView';
import { RootState } from 'src/store';
import { EditorFile } from 'src/types/editor';
import { Button } from '@blueprintjs/core';
import AceEditor from 'react-ace';
import {
  ImperativePanelHandle,
  Panel,
  PanelGroup,
  PanelResizeHandle,
} from 'react-resizable-panels';
import React, { useEffect, useImperativeHandle, useRef, useState } from 'react';

export type ImperativeEditor = {
  getCode: () => string;
};

type Props = {
  multiFile?: boolean;
  filesLoader?: (state: RootState) => EditorFile[];
};

const EditorComponent: React.ForwardRefRenderFunction<ImperativeEditor, Props> = (
  { multiFile = false, filesLoader: _loadFiles = () => [] },
  editorRef
) => {
  const [code, setCode] = useState('');
  const [fileExplorerOpen, setFileExplorerOpen] = useState(false);
  const ref = useRef<AceEditor>(null);

  useImperativeHandle<ImperativeEditor, ImperativeEditor>(editorRef, () => ({
    getCode: () => ref.current?.editor?.getValue() ?? '',
  }));

  const fileExplorerRef = useRef<ImperativePanelHandle>(null);
  const [resizeFocused, setResizeFocused] = useState(false);

  useEffect(() => {
    if (fileExplorerOpen) {
      fileExplorerRef.current?.expand();
    } else {
      fileExplorerRef.current?.collapse();
    }
  }, [fileExplorerOpen]);

  return (
    <PanelGroup direction="horizontal">
      <Panel
        ref={fileExplorerRef}
        collapsedSize={0}
        collapsible
        minSize={5}
        defaultSize={25}
        maxSize={50}
        onCollapse={() => setFileExplorerOpen(false)}
      >
        <FileSystemView workspaceLocation="playground" basePath="/playground" />
      </Panel>
      {(fileExplorerOpen || resizeFocused) && (
        <PanelResizeHandle
          onDragging={setResizeFocused}
          style={{ width: 8, backgroundColor: 'black' }}
        />
      )}
      <Panel>
        {multiFile && <Button icon="menu" onClick={() => setFileExplorerOpen(v => !v)} />}
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
      </Panel>
    </PanelGroup>
  );
};

const Editor = React.forwardRef(EditorComponent);
Editor.displayName = 'Editor';

export default Editor;
