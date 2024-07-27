import { render } from '@testing-library/react';
import { act } from 'react';
import { ToggleThemeButton } from './ToggleThemeButton';
import { ThemeProvider } from 'core/providers/themeProvider';

test('testing ToggleThemeButton', async () => {
  const { getByAltText } = render(
    <ThemeProvider>
      <ToggleThemeButton />
    </ThemeProvider>
  );

  const darkTheme = await getByAltText(/dark/i);
  expect(darkTheme).toBeInTheDocument();

  act(() => darkTheme.click());

  const lightTheme = getByAltText(/light/i);
  expect(lightTheme).toBeInTheDocument();
});
