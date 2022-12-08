export type ThemeMode = 'light' | 'dark';

export interface ICustomThemeService {
  currentTheme: ThemeMode;
  changeTheme: (newTheme: ThemeMode) => void;
}
