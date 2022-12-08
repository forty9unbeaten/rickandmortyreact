import * as React from 'react';
import * as Redux from 'react-redux';
import {
  ReducersMapObject,
  combineReducers,
  configureStore,
} from '@reduxjs/toolkit';

import { themeReducer, themeStateKey } from '@rick-and-morty-react/theme';
import { IAppEnvironment, IRootState } from '@rick-and-morty-react/types';

import { ReduxStateContext } from '../context';

export const ReduxStateService: React.FunctionComponent<
  React.PropsWithChildren & IAppEnvironment
> = ({ children, production }) => {
  const [reducerMap] = React.useState<ReducersMapObject>({
    [themeStateKey]: themeReducer,
  });

  const reducer = React.useMemo(
    () => combineReducers(reducerMap),
    [reducerMap]
  );

  const store = React.useMemo(
    () =>
      configureStore({
        reducer,

        devTools: !production,
      }),
    [production, reducer]
  );

  const dispatch: typeof store.dispatch = Redux.useDispatch();

  const useAppSelector: Redux.TypedUseSelectorHook<IRootState> =
    Redux.useSelector;

  return (
    <Redux.Provider store={store}>
      <ReduxStateContext.Provider value={{ dispatch, useAppSelector }}>
        {children}
      </ReduxStateContext.Provider>
    </Redux.Provider>
  );
};
