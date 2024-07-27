import { createContext, useContext } from 'react';
import { ThemeType } from 'shared/types';

interface ThemeContextType {
  theme: ThemeType;
  toggleTheme: () => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) throw new Error('ThemeContext is undefined');

  return context;
};

export { useTheme, ThemeContext };
