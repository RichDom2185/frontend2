import { Button, Card, Collapse } from '@blueprintjs/core';
import React, { useState } from 'react';

import classes from 'src/styles/Sicp.module.scss';

type Props = {
  title: string;
  body: React.ReactNode;
  solution: React.ReactNode;
};

const noSolutionPlaceholder = (
  <span>
    There is currently no solution available for this exercise. This textbook adaptation is a
    community effort. Do consider contributing by providing a solution for this exercise.
    Instructions on how to contribute can be found at{' '}
    <a href="https://github.com/source-academy/sicp/wiki/Contributing-Exercise-Solutions">
      https://github.com/source-academy/sicp/wiki/Contributing-Exercise-Solutions
    </a>
    .
  </span>
);

const SicpExercise: React.FC<Props> = ({ title, body, solution }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <Card className={classes['sicp-exercise']}>
      <p>
        <b>{title}</b>
      </p>
      {body}
      <div className={classes['sicp-show-solution-button']}>
        <Button minimal intent="primary" onClick={() => setIsOpen(!isOpen)}>
          {isOpen ? 'Hide Solution' : 'Show Solution'}
        </Button>
      </div>
      <Collapse isOpen={isOpen}>
        <div>{solution || noSolutionPlaceholder}</div>
      </Collapse>
    </Card>
  );
};

export default SicpExercise;
