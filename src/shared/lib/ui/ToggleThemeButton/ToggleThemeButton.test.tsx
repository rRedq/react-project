import { render } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { App } from 'app/App';
import { act } from 'react';

test('testing ToggleThemeButton', async () => {
  const { getByAltText } = render(
    <BrowserRouter>
      <App />
    </BrowserRouter>
  );

  const darkTheme = await getByAltText('dark');
  expect(darkTheme).toBeInTheDocument();

  act(() => darkTheme.click());

  const lightTheme = getByAltText('light');
  expect(lightTheme).toBeInTheDocument();
});
