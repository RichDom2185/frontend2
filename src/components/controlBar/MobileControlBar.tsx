import LanguageSelector from './LanguageSelector';
import { LanguageGroup } from 'src/types/languages';
import { TabId, tabIdToIconMap, tabIdToLabelMap } from 'src/utils/sideContent';
import { Button, Classes, Divider, Position, Tooltip } from '@blueprintjs/core';
import classNames from 'classnames';
import React, { useState } from 'react';

import classes from 'src/styles/MobileControlBar.module.scss';

const tabs = [
  'editor',
  'sideContentStepper',
  'sideContentCseMachine',
  'sideContentRemoteExecution',
  'editor',
  'editor',
] as const satisfies TabId[];

const MobileControlBar: React.FC = () => {
  const [currentTabId, setCurrentTabId] = useState<`${TabId}${number}`>('editor0');

  return (
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
            <Tooltip key={tabId} content={tabIdToLabelMap[tab]} position={Position.TOP}>
              <Button
                className={classNames(
                  classes['tab-button'],
                  isActive && classes['tab-button-active']
                )}
                onClick={() => setCurrentTabId(tabId)}
                icon={tabIdToIconMap[tab]}
                minimal={!isActive}
              />
            </Tooltip>
          );
        })}
      </div>
      <div className={classes['control-group']}>
        <Divider />
        <Tooltip content="Settings" position={Position.TOP}>
          <Button rightIcon="cog" intent="success" />
        </Tooltip>
        <Tooltip content="Run" position={Position.TOP}>
          <Button rightIcon="play" intent="primary" />
        </Tooltip>
      </div>
    </div>
  );
};

export default MobileControlBar;
