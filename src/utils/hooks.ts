import { AppDispatch, RootState } from '../store';
// eslint-disable-next-line no-restricted-imports
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
import { useMediaQuery } from 'react-responsive';
import { useEffect, useState } from 'react';

export const useAppDispatch: () => AppDispatch = useDispatch;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

/**
 * Returns whether the current view falls under mobile
 * or desktop as defined by the constants file.
 */
export const useResponsive = () => {
  const isMobileBreakpoint = useMediaQuery({ maxWidth: 768 });
  return { isMobileBreakpoint };
};

const defaultStyles: React.CSSProperties = {
  maxHeight: '100vh',
  maxWidth: '100vw',
};

// Adapted from https://gist.github.com/ptb/9ace4534d67393683bf7191370a16089
export const useDetectKeyboard = () => {
  const [styles, setStyles] = useState<React.CSSProperties>(defaultStyles);

  const updateViewport = () => {
    setStyles({
      maxHeight: window.visualViewport?.height ?? defaultStyles.maxHeight,
      maxWidth: window.visualViewport?.width ?? defaultStyles.maxWidth,
    });
  };

  useEffect(() => {
    updateViewport();
    window.visualViewport?.addEventListener('resize', updateViewport);
    return () => {
      window.visualViewport?.removeEventListener('resize', updateViewport);
    };
  }, []);

  return { styles };
};
