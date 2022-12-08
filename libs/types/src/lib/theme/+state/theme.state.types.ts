import { ThemeMode } from '../services';

export type ThemeStateKey = 'customTheme';

export interface ICustomThemeState {
  currentTheme: ThemeMode;
}
