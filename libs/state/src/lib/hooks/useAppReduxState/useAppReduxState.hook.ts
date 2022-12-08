import * as React from 'react';

import { IAppStateService } from '@rick-and-morty-react/types';

import { ReduxStateContext } from '../../context';

export const useAppReduxState = (): IAppStateService => {
  const reduxContext = React.useContext(ReduxStateContext);

  if (!reduxContext) {
    throw new Error(
      'No Redux state context provided. Check the AppService Provider.'
    );
  }

  return reduxContext;
};
