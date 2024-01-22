import {
  Alignment,
  AnchorButton,
  Navbar,
  NavbarDivider,
  NavbarGroup,
  NavbarHeading,
} from '@blueprintjs/core';
import React from 'react';

const NavigationBar: React.FC = () => {
  return (
    <Navbar>
      <NavbarGroup align={Alignment.LEFT}>
        <NavbarHeading>Playground</NavbarHeading>
        <NavbarDivider />
        <AnchorButton href="#" text="Reference" target="_blank" minimal rightIcon="share" />
      </NavbarGroup>
    </Navbar>
  );
};

export default NavigationBar;
