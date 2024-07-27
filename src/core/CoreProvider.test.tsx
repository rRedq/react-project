import { render } from '@testing-library/react';
import { Main } from 'pages/Main/Main';
import { Provider } from 'react-redux';
import { store } from './providers/storeProvider';
import { ThemeProvider } from './providers/themeProvider';

test('testing App', async () => {
  const { getByText } = render(
    <ThemeProvider>
      <Provider store={store}>
        <Main />
      </Provider>
    </ThemeProvider>
  );

  const h1Text = getByText(/Star Wars DB/i);
  expect(h1Text).toBeInTheDocument();
});
