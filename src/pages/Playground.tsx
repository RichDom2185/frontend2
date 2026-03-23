import NavigationBar from '../components/app/NavigationBar';
import Editor from '../components/editor/Editor';
import ControlBar from 'src/components/controlBar/ControlBar';
import MobileControlBar from 'src/components/controlBar/MobileControlBar';
import { useResponsive } from 'src/utils/hooks';
import { Button, Card, Classes } from '@blueprintjs/core';
import classNames from 'classnames';
import { Group, Panel, Separator, useGroupRef, usePanelRef } from 'react-resizable-panels';
import { useRef, useState } from 'react';

import classes from 'src/styles/Playground.module.scss';

const barHeight = 5;

const Playground: React.FC = () => {
  const [folderMode, setFolderMode] = useState(false);
  const { isMobileBreakpoint } = useResponsive();
  const pinnedBottomSheetRef = useRef<HTMLDivElement>(null);

  // Fix to calculate absolute height (in pixels)
  const sheetPanelRef = usePanelRef();
  const bottomSheetRef = useRef<HTMLDivElement>(null);
  const panelGroupRef = useGroupRef();

  // Fix for resizing to <= 3%
  const resizeHeight = useRef<number>(undefined);

  return (
    <>
      <NavigationBar />
      {!isMobileBreakpoint && (
        <ControlBar defaultFolderMode={folderMode} handleFolderModeChange={setFolderMode} />
      )}
      <Group orientation="vertical" groupRef={panelGroupRef}>
        <Panel id="workspace">
          <Editor multiFile={folderMode} />
        </Panel>
        <Panel panelRef={sheetPanelRef} defaultSize={0}>
          <Separator
            className={classes['mobile-side-content-resize-handle']}
            style={{ height: barHeight }}
            onDragEnd={() => {
              // Only resize if final size is <= 3%
              if ((sheetPanelRef.current?.getSize().asPercentage ?? 0) > 3) {
                return;
              }
              sheetPanelRef.current?.resize(resizeHeight.current!);
            }}
          />
          <div className={classes['mobile-side-content-container']} ref={pinnedBottomSheetRef} />
        </Panel>
      </Group>
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
                      const panelHeight = panelGroupRef.current?.getLayout()['workspace'];
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
