import NavigationBar from '../components/app/NavigationBar';
import Editor from '../components/editor/Editor';
import ControlBar from 'src/components/controlBar/ControlBar';
import MobileControlBar from 'src/components/controlBar/MobileControlBar';
import { useResponsive } from 'src/utils/hooks';
import { Button, Card, Classes } from '@blueprintjs/core';
import classNames from 'classnames';
import {
  getPanelGroupElement,
  ImperativePanelHandle,
  Panel,
  PanelGroup,
  PanelResizeHandle,
} from 'react-resizable-panels';
import React, { useEffect, useRef, useState } from 'react';

import classes from 'src/styles/Playground.module.scss';

const barHeight = 5;

const Playground: React.FC = () => {
  const [folderMode, setFolderMode] = useState(false);
  const { isMobileBreakpoint } = useResponsive();
  const pinnedBottomSheetRef = useRef<HTMLDivElement>(null);

  // Fix to calculate absolute height (in pixels)
  const sheetPanelRef = useRef<ImperativePanelHandle>(null);
  const bottomSheetRef = useRef<HTMLDivElement>(null);
  const panelGroupRef = useRef<HTMLElement | null>();
  useEffect(() => {
    const groupElement = getPanelGroupElement('workspace-group');
    panelGroupRef.current = groupElement;
  }, []);

  // Fix for resizing to <= 3%
  const resizeHeight = useRef<number>();

  return (
    <>
      <NavigationBar />
      {!isMobileBreakpoint && (
        <ControlBar defaultFolderMode={folderMode} handleFolderModeChange={setFolderMode} />
      )}
      <PanelGroup direction="vertical" id="workspace-group">
        <Panel>
          <Editor multiFile={folderMode} />
        </Panel>
        <Panel ref={sheetPanelRef} defaultSize={0}>
          <PanelResizeHandle
            className={classes['mobile-side-content-resize-handle']}
            style={{ height: barHeight }}
            onDragging={dragging => {
              // Only resize if final size is <= 3%
              if (dragging || (sheetPanelRef.current?.getSize() ?? 0) > 3) {
                return;
              }
              sheetPanelRef.current?.resize(resizeHeight.current!);
            }}
          />
          <div className={classes['mobile-side-content-container']} ref={pinnedBottomSheetRef} />
        </Panel>
      </PanelGroup>
      {isMobileBreakpoint && (
        <MobileControlBar
          portalRef={pinnedBottomSheetRef}
          renderBottomSheet={(close, pinned, setPinned, tabIndex) => (
            <div
              ref={bottomSheetRef}
              className={classNames(Classes.DARK, classes['mobile-side-content'])}
              style={{ borderTopWidth: pinned ? 0 : barHeight }}
            >
              <div className={classes['mobile-side-content-header']}>
                <Button
                  small
                  minimal
                  icon="pin"
                  active={pinned}
                  onClick={() => {
                    setPinned(!pinned);
                    if (pinned) {
                      // pinned -> unpinned
                      sheetPanelRef.current?.resize(0);
                    } else {
                      // unpinned -> pinned
                      const sheetHeight = bottomSheetRef.current?.clientHeight;
                      const panelHeight = panelGroupRef.current?.clientHeight;
                      resizeHeight.current = ((sheetHeight! + barHeight) / panelHeight!) * 100;
                      sheetPanelRef.current?.resize(resizeHeight.current);
                    }
                  }}
                >
                  {pinned ? 'Unpin' : 'Pin'}
                </Button>
                <Button
                  small
                  minimal
                  rightIcon="cross"
                  onClick={() => {
                    sheetPanelRef.current?.resize(0);
                    close();
                  }}
                  intent="danger"
                >
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
