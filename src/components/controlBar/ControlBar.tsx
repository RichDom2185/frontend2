import LanguageSelector from './LanguageSelector';
import { LanguageGroup } from 'src/types/languages';
import { Button, Classes, Switch } from '@blueprintjs/core';
import classNames from 'classnames';
import { useState } from 'react';

import classes from 'src/styles/ControlBar.module.scss';

type Props = {
  defaultFolderMode?: boolean;
  handleFolderModeChange?: (folderMode: boolean) => void;
};

const ControlBar: React.FC<Props> = ({ defaultFolderMode, handleFolderModeChange }) => {
  const [folderMode, setFolderMode] = useState(!!defaultFolderMode);

  return (
    <div className={classNames(classes['control-bar'], Classes.DARK)}>
      <Button className={classes['run-button']} rightIcon="play" intent="primary">
        Run
      </Button>
      <LanguageSelector group={LanguageGroup.JAVASCRIPT} />
      <Switch
        inline
        style={{ margin: 0 }}
        checked={folderMode}
        onChange={() => {
          setFolderMode(v => !v);
          handleFolderModeChange?.(!folderMode);
        }}
      >
        Folder Mode {folderMode ? 'On' : 'Off'}
      </Switch>
    </div>
  );
};

export default ControlBar;
