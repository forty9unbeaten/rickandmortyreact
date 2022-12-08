import * as React from 'react';

import { ICustomThemeService } from '@rick-and-morty-react/types';
import { CustomThemeContext } from '../../context';

export const useCustomTheme = (): ICustomThemeService => {
  const customThemeContext = React.useContext(CustomThemeContext);

  if (!customThemeContext) {
    throw new Error(
      'No theme context provided. Check the App Service provider'
    );
  }

  return customThemeContext;
};
