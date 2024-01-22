import { RootState } from 'src/store';
import { ThunkAction, UnknownAction } from '@reduxjs/toolkit';

export type Thunk<T> = ThunkAction<Promise<T>, RootState, undefined, UnknownAction>;
