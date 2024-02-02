import NavigationBar from '../components/app/NavigationBar';
import Editor from '../components/editor/Editor';
import ControlBar from 'src/components/controlBar/ControlBar';
import MobileControlBar from 'src/components/controlBar/MobileControlBar';
import { useResponsive } from 'src/utils/hooks';
import { Button, Card, Classes } from '@blueprintjs/core';
import classNames from 'classnames';
import React, { useRef, useState } from 'react';

import classes from 'src/styles/Playground.module.scss';

const Playground: React.FC = () => {
  const [folderMode, setFolderMode] = useState(false);
  const { isMobileBreakpoint } = useResponsive();
  const pinnedBottomSheetRef = useRef<HTMLDivElement>(null);

  return (
    <>
      <NavigationBar />
      {!isMobileBreakpoint && (
        <ControlBar defaultFolderMode={folderMode} handleFolderModeChange={setFolderMode} />
      )}
      <Editor multiFile={folderMode} />
      <div ref={pinnedBottomSheetRef} />
      {isMobileBreakpoint && (
        <MobileControlBar
          portalRef={pinnedBottomSheetRef}
          renderBottomSheet={(close, pinned, setPinned, tabIndex) => (
            <div className={classNames(Classes.DARK, classes['mobile-side-content'])}>
              <div className={classes['mobile-side-content-header']}>
                <Button small minimal icon="pin" active={pinned} onClick={() => setPinned(!pinned)}>
                  {pinned ? 'Unpin' : 'Pin'}
                </Button>
                <Button small minimal rightIcon="cross" onClick={close} intent="danger">
                  Close
                </Button>
              </div>
              {/* TODO: Implement */}
              <p>Currently on tab {tabIndex + 1}</p>
              <Card compact>Output will be here</Card>
            </div>
          )}
        />
      )}
    </>
  );
};

export default Playground;

export const Component = Playground;
Component.displayName = 'Playground';
