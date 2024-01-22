import NavigationBar from '../components/app/NavigationBar';
import Editor from '../components/editor/Editor';
import React from 'react';

const Playground: React.FC = () => {
  return (
    <>
      <NavigationBar />
      <Editor />
    </>
  );
};

export default Playground;

export const Component = Playground;
Component.displayName = 'Playground';
