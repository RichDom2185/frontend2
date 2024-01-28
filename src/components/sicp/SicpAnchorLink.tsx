import { RefType } from 'src/utils/sicp';
import { Icon } from '@blueprintjs/core';
import { Link } from 'react-router-dom';
import React from 'react';

type Props = {
  children: React.ReactNode;
  id: string | undefined;
  refs: RefType;
  top: number;
};

const SicpAnchorLink: React.FC<Props> = ({ refs, id, children, top }) => {
  return (
    <div className="sicp-anchor-link-container">
      {id && (
        <Link
          className="sicp-anchor-link"
          style={{ top: top }}
          ref={ref => (refs.current[id] = ref)}
          to={id}
        >
          <Icon icon="link" />
        </Link>
      )}
      {children}
    </div>
  );
};

export default SicpAnchorLink;
