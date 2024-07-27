import { render } from '@testing-library/react';
import { setupServer } from 'msw/node';
import { swapi } from 'shared/lib/api/swApi';
import {
  testDataDetails,
  testDataWithFiveResult,
  testDataWithNullResult,
  testDataWithOneItem,
} from 'shared/lib/__mock__';
import { store } from 'core/providers/storeProvider';
import { act } from 'react';
import { CardList } from './CardList';
import { Provider } from 'react-redux';
import { Main } from 'pages/Main/Main';
import { ThemeProvider } from 'core/providers/themeProvider';
import mockRouter from 'next-router-mock';

const server = setupServer();

beforeAll(() => {
  server.listen();
});

beforeEach(() => {
  server.resetHandlers();
  store.dispatch(swapi.util.resetApiState());
});

afterAll(() => {
  server.close();
});

describe('testing CardList', () => {
  it('testing number of cards should be equal 5', async () => {
    server.use(testDataWithFiveResult);
    const { findAllByTestId, findByTestId } = render(
      <ThemeProvider>
        <Provider store={store}>
          <Main />
        </Provider>
      </ThemeProvider>
    );

    const spinner = await findByTestId(/spinner/i);
    expect(spinner).toBeInTheDocument();

    const imgCount = await findAllByTestId(/card/i);
    expect(spinner).not.toBeInTheDocument();
    expect(imgCount).toHaveLength(5);
  });
  it('testing number of cards should be equal 0', async () => {
    server.use(testDataWithNullResult);
    const { findByText, getByTestId } = render(
      <Provider store={store}>
        <CardList />
      </Provider>
    );

    const spinner = getByTestId(/spinner/i);
    expect(spinner).toBeInTheDocument();

    const placeholderText = await findByText(
      /We have been able to find nothing/i
    );
    expect(spinner).not.toBeInTheDocument();
    expect(placeholderText).toBeInTheDocument();
  });
  it('testing click to close details', async () => {
    server.use(testDataWithOneItem);
    server.use(testDataDetails);
    const { findByTestId } = render(
      <ThemeProvider>
        <Provider store={store}>
          <Main />
        </Provider>
      </ThemeProvider>
    );

    const card = await findByTestId(/card/i);
    expect(card).toBeInTheDocument();

    act(() => card.click());

    expect(mockRouter.query.details).toBe('1');
  });
});
