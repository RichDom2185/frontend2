import NavigationBar from './components/app/NavigationBar';
import Editor from './components/editor/Editor';
import classes from './styles/app.module.scss';
import { Classes } from '@blueprintjs/core';
import classNames from 'classnames';
import React from 'react';

import '@blueprintjs/core/lib/css/blueprint.css';

const App: React.FC = () => {
  return (
    <div className={classNames(Classes.DARK, classes.app_container)}>
      <NavigationBar />
      <Editor />
    </div>
  );
};

export default App;
