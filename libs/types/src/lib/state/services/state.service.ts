import { Dispatch } from 'react';
import { ThunkDispatch, AnyAction, Action } from '@reduxjs/toolkit';
import { IRootState } from '../+state';
import { TypedUseSelectorHook } from 'react-redux';

export interface IAppStateService {
  dispatch: ThunkDispatch<IRootState, undefined, AnyAction> &
    Dispatch<Action<string>>;
  useAppSelector: TypedUseSelectorHook<IRootState>;
}
