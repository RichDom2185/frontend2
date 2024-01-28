import Latex from 'react-latex-next';
import React from 'react';

type Props = {
  math: string;
};

const SicpLatex: React.FC<Props> = ({ math }) => {
  return <Latex>{math}</Latex>;
};

export default SicpLatex;
