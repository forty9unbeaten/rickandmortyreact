import { IAppStateService } from '@rick-and-morty-react/types';
import * as React from 'react';

export const ReduxStateContext = React.createContext<
  IAppStateService | undefined
>(undefined);
