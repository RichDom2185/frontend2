import LanguageSelector from './LanguageSelector';
import { LanguageGroup } from 'src/types/languages';
import { Button, Classes } from '@blueprintjs/core';
import classNames from 'classnames';
import React from 'react';

import classes from 'src/styles/ControlBar.module.scss';

const ControlBar: React.FC = () => {
  return (
    <div className={classNames(classes['control-bar'], Classes.DARK)}>
      <Button rightIcon="play" intent="primary">
        Run
      </Button>
      <LanguageSelector group={LanguageGroup.JAVASCRIPT} />
    </div>
  );
};

export default ControlBar;
