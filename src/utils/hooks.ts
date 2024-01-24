import { AppDispatch, RootState } from '../store';
import { TypedUseSelectorHook } from 'react-redux';
// eslint-disable-next-line no-restricted-imports
import { useDispatch, useSelector } from 'react-redux';
import { useMediaQuery } from 'react-responsive';

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
