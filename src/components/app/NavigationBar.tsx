import Constants from 'src/utils/constants';
import { Alignment, Button, Classes, Navbar } from '@blueprintjs/core';
import classNames from 'classnames';
import { NavLink } from 'react-router-dom';

import classes from 'src/styles/NavigationBar.module.scss';

const navbarRoutes = [
  { path: '/playground', name: 'Playground', icon: 'code' },
  { path: '/sicp', name: 'SICP', icon: 'book' },
] as const;

const NavigationBar: React.FC = () => {
  return (
    <Navbar className={classNames(Classes.DARK, classes['primary-navbar'])}>
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
        <div style={{ display: 'flex', columnGap: 6 }}>
          {navbarRoutes.map(({ path, name, icon }) => (
            <NavLink key={path} to={path}>
              {({ isActive }) => (
                <Button minimal active={isActive} className={classes.navlink} icon={icon}>
                  {name}
                </Button>
              )}
            </NavLink>
          ))}
        </div>
      </Navbar.Group>
    </Navbar>
  );
};

export default NavigationBar;
