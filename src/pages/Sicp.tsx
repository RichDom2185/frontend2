import SicpIndexPage from './SicpIndexPage';
import Loading from 'src/components/app/Loading';
import NavigationBar from 'src/components/app/NavigationBar';
import SicpNavigationBar from 'src/components/sicp/SicpNavigationBar';
import SicpToc from 'src/components/sicp/SicpToc';
import { actions } from 'src/store';
import { useResponsive } from 'src/utils/hooks';
import { parseArr } from 'src/utils/sicp';
import { Classes, Drawer, Position } from '@blueprintjs/core';
import classNames from 'classnames';
import { useLocation, useParams } from 'react-router-dom';
import React, { useEffect, useRef, useState } from 'react';

import classes from 'src/styles/Sicp.module.scss';

const Sicp: React.FC = () => {
  const { chapter } = useParams<{ chapter: string }>();
  const refs = useRef<Record<string, HTMLElement | null>>({});
  const { isMobileBreakpoint } = useResponsive();
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    if (chapter === undefined) {
      return;
    }
  }, [chapter]);

  useEffect(() => {
    refs.current[location.hash]?.scrollIntoView({ behavior: 'smooth' });
  }, [location.hash]);

  const drawer = (closeFn: () => void) => (
    <Drawer
      autoFocus
      canEscapeKeyClose
      canOutsideClickClose
      hasBackdrop
      isCloseButtonShown
      isOpen={isDrawerOpen}
      onClose={closeFn}
      title="Table of Contents"
      position={Position.LEFT}
      size={isMobileBreakpoint ? '100%' : '35%'}
    >
      <SicpToc handleCloseToc={closeFn} />
    </Drawer>
  );

  if (chapter === undefined) {
    return (
      <>
        <NavigationBar />
        <SicpNavigationBar handleOpenToc={() => setIsDrawerOpen(true)} />
        <div className={classes['sicp-container']}>
          <SicpIndexPage />
        </div>
        {drawer(() => setIsDrawerOpen(false))}
      </>
    );
  }

  return (
    <>
      <NavigationBar />
      <Loading loader={actions.getChapterData(chapter)} message="Loading content…">
        {(data, refresh) => (
          <div className={classNames(classes['sicp-container'], Classes.RUNNING_TEXT)}>
            <SicpNavigationBar handleOpenToc={() => setIsDrawerOpen(true)} />
            <div className={classes['sicp-body']}>{parseArr(data, refs)}</div>
            {drawer(() => {
              setIsDrawerOpen(false);
              // Give some time for the drawer to animate closing
              refresh(200);
            })}
          </div>
        )}
      </Loading>
    </>
  );
};

export default Sicp;

export const Component = Sicp;
Component.displayName = 'Sicp';
