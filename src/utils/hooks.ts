import { AppDispatch, RootState } from '../store';
import { TypedUseSelectorHook } from 'react-redux';
// eslint-disable-next-line no-restricted-imports
import { useDispatch, useSelector } from 'react-redux';

export const useAppDispatch: () => AppDispatch = useDispatch;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
