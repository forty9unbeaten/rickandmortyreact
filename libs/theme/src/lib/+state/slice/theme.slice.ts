import { PayloadAction, createSlice, Reducer } from '@reduxjs/toolkit';

import {
  ICustomThemeState,
  ThemeMode,
  ThemeStateKey,
} from '@rick-and-morty-react/types';

const name: ThemeStateKey = 'customTheme';

const initialState: ICustomThemeState = {
  currentTheme: 'light',
};

const themeSlice = createSlice({
  name,

  initialState,

  reducers: {
    change: (
      state: ICustomThemeState,
      action: PayloadAction<ThemeMode>
    ): ICustomThemeState => ({
      ...state,
      currentTheme: action.payload,
    }),
  },
});

export const themeReducer: Reducer<ICustomThemeState> = themeSlice.reducer;

export const themeStateKey: string = themeSlice.name;

export const themeActions = themeSlice.actions;
