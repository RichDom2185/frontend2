import NavigationBar from '../components/app/NavigationBar';
import Editor from '../components/editor/Editor';
import ControlBar from 'src/components/controlBar/ControlBar';
import React from 'react';

const Playground: React.FC = () => {
  return (
    <>
      <NavigationBar />
      <ControlBar />
      <Editor />
    </>
  );
};

export default Playground;

export const Component = Playground;
Component.displayName = 'Playground';
