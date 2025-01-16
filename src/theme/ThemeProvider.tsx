import React, { createContext, useContext } from 'react';
import { theme, Theme } from '.';

const ThemeContext = createContext<Theme>(theme);

export const useTheme = () => useContext(ThemeContext);

export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <ThemeContext.Provider value={theme}>
      {children}
    </ThemeContext.Provider>
  );
};
