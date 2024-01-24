import Constants from 'src/utils/constants';
import { Alignment, AnchorButton, Button, Classes, Navbar } from '@blueprintjs/core';
import classNames from 'classnames';
import { NavLink } from 'react-router-dom';
import React from 'react';

import classes from 'src/styles/NavigationBar.module.scss';

const navbarRoutes = [{ path: '/playground', name: 'Playground', icon: 'code' }] as const;

const NavigationBar: React.FC = () => {
  return (
    <Navbar className={Classes.DARK}>
      <Navbar.Group align={Alignment.LEFT}>
        {Constants.appName && (
          <>
            <NavLink to="/">
              {({ isActive }) => (
                <Button
                  minimal
                  icon="symbol-diamond"
                  active={isActive}
                  className={classNames(classes.navlink, classes.heading)}
                >
                  {Constants.appName}
                </Button>
              )}
            </NavLink>
            <Navbar.Divider />
          </>
        )}
        {navbarRoutes.map(({ path, name, icon }) => (
          <NavLink key={path} to={path}>
            {({ isActive }) => (
              <Button minimal active={isActive} className={classes.navlink} icon={icon}>
                {name}
              </Button>
            )}
          </NavLink>
        ))}
        <AnchorButton href="#" text="Reference" target="_blank" minimal rightIcon="share" />
      </Navbar.Group>
    </Navbar>
  );
};

export default NavigationBar;
