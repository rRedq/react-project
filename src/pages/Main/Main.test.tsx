import { render } from '@testing-library/react';
import { setupServer } from 'msw/node';
import { swapi } from 'shared/lib/api/swApi';
import { store } from 'core/providers/storeProvider';
import { testDataWithFiveResult } from 'shared/lib/__mock__';
import { Main } from './Main';
import { CoreProvider } from 'core/CoreProvider';

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

describe('testing Main', () => {
  it('testing base shape of main', () => {
    server.use(testDataWithFiveResult);
    const { getByText, getByAltText, getAllByTestId, getByTestId } = render(
      <CoreProvider>
        <Main />
      </CoreProvider>
    );

    const logo = getByText(/Star Wars DB/i);
    expect(logo).toBeInTheDocument();

    const categories = getAllByTestId(/category/i);
    expect(categories).toHaveLength(3);

    const search = getByAltText(/search/i);
    expect(search).toBeInTheDocument();

    const spinner = getByTestId(/spinner/i);
    expect(spinner).toBeInTheDocument();

    const errorBtn = getByText(/error/i);
    expect(errorBtn).toBeInTheDocument();
  });
  it('testing success data response', async () => {
    server.use(testDataWithFiveResult);

    const { findAllByTestId } = render(
      <CoreProvider>
        <Main />
      </CoreProvider>
    );

    const cardList = await findAllByTestId(/card/i);

    expect(cardList).toHaveLength(5);
  });
});
