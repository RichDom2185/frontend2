import { Card, Icon } from '@blueprintjs/core';
import classNames from 'classnames';
import React from 'react';

import classes from 'src/styles/EditorTab.module.scss';

type Props = {
  filePath: string;
  isActive: boolean;
  setActive: () => void;
  remove: () => void;
};

const EditorTab: React.FC<Props> = ({ filePath, isActive, setActive, remove }) => {
  const onClick = (e: React.MouseEvent<HTMLElement>) => {
    // Stop the click event from propagating to the parent component.
    e.stopPropagation();
    remove();
  };

  return (
    <Card
      className={classNames(classes['editor-tab'], {
        [classes['selected']]: isActive,
      })}
      onClick={setActive}
    >
      {filePath}
      <Icon className={classes['remove-button']} icon="small-cross" onClick={onClick} />
    </Card>
  );
};

export default EditorTab;
