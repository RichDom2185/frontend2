import classes from '../../styles/NavigationBar.module.scss';
import { Alignment, AnchorButton, Button, Navbar } from '@blueprintjs/core';
import classNames from 'classnames';
import { NavLink } from 'react-router-dom';
import React from 'react';

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
