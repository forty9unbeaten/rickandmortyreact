import { ICustomThemeState, ThemeStateKey } from '../../theme';

export type IRootState = {
  [key in ThemeStateKey]: ICustomThemeState;
};

export type AppLoadingStatus = 'idle' | 'pending' | 'fulfilled' | 'rejected';

export type AppError = { message: string; code?: number; details?: string };
