import { Alignment, AnchorButton, Button, Navbar } from '@blueprintjs/core';
import classNames from 'classnames';
import { NavLink } from 'react-router-dom';
import React from 'react';

import classes from 'src/styles/NavigationBar.module.scss';

const NavigationBar: React.FC = () => {
  return (
    <Navbar>
      <Navbar.Group align={Alignment.LEFT}>
        <NavLink to="/playground">
          {({ isActive }) => (
            <Button
              minimal
              active={isActive}
              className={classNames(classes.navlink, classes.heading)}
            >
              Playground
            </Button>
          )}
        </NavLink>
        <Navbar.Divider />
        <AnchorButton href="#" text="Reference" target="_blank" minimal rightIcon="share" />
      </Navbar.Group>
    </Navbar>
  );
};

export default NavigationBar;
