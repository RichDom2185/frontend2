import LanguageSelector from './LanguageSelector';
import { LanguageGroup } from 'src/types/languages';
import { TabId, tabIdToIconMap, tabIdToLabelMap } from 'src/utils/sideContent';
import { Button, Classes, Divider, Position, Tooltip } from '@blueprintjs/core';
import classNames from 'classnames';
import { Drawer } from 'vaul';
import { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';

import classes from 'src/styles/MobileControlBar.module.scss';

type Props = {
  portalRef: React.RefObject<HTMLElement>;
  renderBottomSheet: (
    close: () => void,
    pinned: boolean,
    setPinned: (v: boolean) => void,
    currentActiveTabIndex: number
  ) => React.ReactNode;
};

const tabs = [
  'editor',
  'sideContentStepper',
  'sideContentCseMachine',
  'sideContentRemoteExecution',
  'editor',
  'editor',
] as const satisfies TabId[];

const MobileControlBar: React.FC<Props> = ({ portalRef, renderBottomSheet }) => {
  const [currentTabId, setCurrentTabId] = useState<`${TabId}${number}`>('editor0');
  // TODO: Deduplicate
  const [currentTabIndex, setCurrentTabIndex] = useState(0);
  const [isBottomSheetOpen, setIsBottomSheetOpen] = useState(false);
  const [pinMobileBottomSheet, setPinMobileBottomSheet] = useState(false);

  useEffect(() => {
    if (pinMobileBottomSheet) {
      setIsBottomSheetOpen(false);
    }
  }, [pinMobileBottomSheet]);

  const bottomSheet = renderBottomSheet(
    () => {
      setPinMobileBottomSheet(false);
      setIsBottomSheetOpen(false);
    },
    pinMobileBottomSheet,
    v => {
      setIsBottomSheetOpen(!v);
      setPinMobileBottomSheet(v);
    },
    currentTabIndex
  );
  const portal = portalRef.current
    ? createPortal(pinMobileBottomSheet && bottomSheet, portalRef.current)
    : null;

  const controlBar = (
    <div className={classNames(classes['mobile-control-bar'], Classes.DARK, Classes.SMALL)}>
      <div className={classes['control-group']}>
        <LanguageSelector minimal group={LanguageGroup.JAVASCRIPT} />
        <Divider />
      </div>
      <div className={classNames(classes['control-group'], classes['overflow'])}>
        {tabs.map((tab, i) => {
          const tabId: `${TabId}${number}` = `${tab}${i}`;
          const isActive = currentTabId === tabId;
          return (
            <Tooltip
              disabled={pinMobileBottomSheet}
              key={tabId}
              content={tabIdToLabelMap[tab]}
              position={Position.TOP}
            >
              <Button
                className={classNames(
                  classes['tab-button'],
                  isActive && classes['tab-button-active']
                )}
                onClick={() => {
                  setCurrentTabIndex(i);
                  setCurrentTabId(tabId);
                }}
                icon={tabIdToIconMap[tab]}
                minimal={!isActive}
              />
            </Tooltip>
          );
        })}
      </div>
      <div className={classes['control-group']}>
        <Divider />
        <Tooltip disabled={pinMobileBottomSheet} content="Settings" position={Position.TOP}>
          <Button rightIcon="cog" intent="success" />
        </Tooltip>
        <Tooltip disabled={pinMobileBottomSheet} content="Run" position={Position.TOP}>
          <Button
            rightIcon="play"
            intent="primary"
            onClick={() => {
              // Only trigger modal if there is content to show
              // and the bottom sheet is not pinned
              setIsBottomSheetOpen(!pinMobileBottomSheet && !!bottomSheet);
            }}
          />
        </Tooltip>
      </div>
    </div>
  );

  return (
    <Drawer.Root open={isBottomSheetOpen} onOpenChange={setIsBottomSheetOpen}>
      {controlBar}
      <Drawer.Portal>
        <Drawer.Overlay
          onClick={() => setIsBottomSheetOpen(false)}
          className={classes['bottom-sheet-overlay']}
        />
        <Drawer.Content
          className={classes['bottom-sheet-container']}
          onFocus={e => e.target.blur()}
        >
          {!pinMobileBottomSheet ? bottomSheet : <div />}
          {/* TODO: Investigate deduplication */}
          {controlBar}
        </Drawer.Content>
      </Drawer.Portal>
      {portal}
    </Drawer.Root>
  );
};

export default MobileControlBar;
