import { createSelector } from '@reduxjs/toolkit';

import {
  ICustomThemeState,
  IRootState,
  ThemeMode,
} from '@rick-and-morty-react/types';

const selectThemeState = (state: IRootState): ICustomThemeState =>
  state.customTheme;

export const selectCurrentTheme = createSelector(
  selectThemeState,
  (state: ICustomThemeState): ThemeMode => state.currentTheme
);
