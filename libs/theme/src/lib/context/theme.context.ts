import { ICustomThemeService } from '@rick-and-morty-react/types';
import * as React from 'react';

export const CustomThemeContext = React.createContext<
  ICustomThemeService | undefined
>(undefined);
