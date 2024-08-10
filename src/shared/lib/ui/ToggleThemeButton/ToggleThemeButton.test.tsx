import { render } from '@testing-library/react';
import { act } from 'react';
import { CoreProvider } from 'core';
import { ToggleThemeButton } from './ToggleThemeButton';

test('testing ToggleThemeButton', async () => {
  const { getByAltText } = render(
    <CoreProvider>
      <ToggleThemeButton />
    </CoreProvider>
  );

  const darkTheme = await getByAltText('dark');
  expect(darkTheme).toBeInTheDocument();

  act(() => darkTheme.click());

  const lightTheme = getByAltText('light');
  expect(lightTheme).toBeInTheDocument();
});
