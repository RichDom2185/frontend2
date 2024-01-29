import { RefType } from 'src/utils/sicp';
import { Icon } from '@blueprintjs/core';
import { Link } from 'react-router-dom';
import React from 'react';

import classes from 'src/styles/Sicp.module.scss';

type Props = {
  children: React.ReactNode;
  id: string | undefined;
  refs: RefType;
  top: number;
};

const SicpAnchorLink: React.FC<Props> = ({ refs, id, children, top }) => {
  return (
    <>
      <div className={classes['sicp-anchor-link-container']}>
        {id && (
          <Link
            className={classes['sicp-anchor-link']}
            style={{ top: top }}
            ref={node => (refs.current[id] = node)}
            to={id}
          >
            <Icon icon="link" />
          </Link>
        )}
      </div>
      {children}
    </>
  );
};

export default SicpAnchorLink;
