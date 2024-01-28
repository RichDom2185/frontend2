import { Card, Elevation } from '@blueprintjs/core';
import React from 'react';

type Props = {
  body: string;
  output: string;
  id: string;
  initialEditorValueHash: string;
  prependLength: number | undefined;
};

// TODO: Implement
const SicpCodeSnippet: React.FC<Props> = ({ body }) => {
  return (
    <Card interactive elevation={Elevation.TWO}>
      {body}
    </Card>
  );
};

export default SicpCodeSnippet;
