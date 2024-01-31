import NavigationBar from '../components/app/NavigationBar';
import Editor from '../components/editor/Editor';
import ControlBar from 'src/components/controlBar/ControlBar';
import MobileControlBar from 'src/components/controlBar/MobileControlBar';
import { useResponsive } from 'src/utils/hooks';
import React, { useState } from 'react';

const Playground: React.FC = () => {
  const [folderMode, setFolderMode] = useState(false);
  const { isMobileBreakpoint } = useResponsive();

  return (
    <>
      <NavigationBar />
      {!isMobileBreakpoint && (
        <ControlBar defaultFolderMode={folderMode} handleFolderModeChange={setFolderMode} />
      )}
      <Editor multiFile={folderMode} />
      {isMobileBreakpoint && <MobileControlBar />}
    </>
  );
};

export default Playground;

export const Component = Playground;
Component.displayName = 'Playground';
