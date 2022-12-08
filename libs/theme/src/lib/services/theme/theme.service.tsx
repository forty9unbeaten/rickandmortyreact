import * as React from 'react';

import { useAppReduxState } from '@rick-and-morty-react/state';

import { selectCurrentTheme, themeActions } from '../../+state';
import { CustomThemeContext } from '../../context';
import { ThemeMode } from '@rick-and-morty-react/types';

export const CustomThemeService: React.FunctionComponent<
  React.PropsWithChildren
> = ({ children }) => {
  const { dispatch, useAppSelector } = useAppReduxState();

  const currentTheme = useAppSelector(selectCurrentTheme);

  const [themeStorageKey] = React.useState<string>('rmTheme');

  const parseThemeDataInLocalStorage = React.useCallback((): {
    currentTheme: ThemeMode;
  } | null => {
    const themeStorageJSON: string | null =
      window.localStorage.getItem(themeStorageKey);

    if (themeStorageJSON) {
      const themeStorageData: { currentTheme: ThemeMode } =
        JSON.parse(themeStorageJSON);

      return themeStorageData;
    }

    return null;
  }, [themeStorageKey]);

  const storeThemeDataInLocalStorage = React.useCallback(
    (theme: ThemeMode) => {
      const existingThemeData = parseThemeDataInLocalStorage();

      if (existingThemeData) {
        window.localStorage.removeItem(themeStorageKey);
      }

      window.localStorage.setItem(
        themeStorageKey,
        JSON.stringify({ currentTheme: theme })
      );
    },
    [parseThemeDataInLocalStorage, themeStorageKey]
  );

  const changeTheme = React.useCallback(
    (newTheme: ThemeMode) => {
      if (newTheme !== currentTheme) {
        storeThemeDataInLocalStorage(newTheme);

        dispatch(themeActions.change(newTheme));
      }
    },
    [currentTheme, dispatch, storeThemeDataInLocalStorage]
  );

  React.useEffect(() => {
    const themeStorageData = parseThemeDataInLocalStorage();

    if (!themeStorageData) {
      const createThemeMq = (setting: ThemeMode | 'no-preference') =>
        `(prefers-color-scheme: ${setting})`;

      const prefersDark = window.matchMedia(createThemeMq('dark')).matches;

      let newTheme: ThemeMode = 'light';

      if (prefersDark) {
        newTheme = 'dark';
      }

      storeThemeDataInLocalStorage(newTheme);

      if (newTheme !== currentTheme) {
        dispatch(themeActions.change(newTheme));
      }

      return;
    }

    if (themeStorageData.currentTheme !== currentTheme) {
      dispatch(themeActions.change(themeStorageData.currentTheme));
    }
  }, [
    currentTheme,
    dispatch,
    parseThemeDataInLocalStorage,
    storeThemeDataInLocalStorage,
  ]);

  return (
    <CustomThemeContext.Provider value={{ changeTheme, currentTheme }}>
      <link rel="stylesheet" href="assets/styles/base/base.css" />
      <link
        rel="stylesheet"
        href={`assets/styles/themes/vars-${currentTheme}.css`}
      />
      {children}
    </CustomThemeContext.Provider>
  );
};
