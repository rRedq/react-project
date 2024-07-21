import { BrowserRouter } from 'react-router-dom';
import { render } from '@testing-library/react';
import { setupServer } from 'msw/node';
import { App } from 'app/App';
import { swapi } from 'shared/lib/api/swApi';
import { store } from 'app/providers/storeProvider';
import { testDataWithFiveResult } from 'shared/lib/__mock__';

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
    const { getByText, getByAltText, getAllByTestId, getByTestId } = render(
      <BrowserRouter>
        <App />
      </BrowserRouter>
    );

    const logo = getByText(/Star Wars DB/i);
    expect(logo).toBeInTheDocument();

    const categories = getAllByTestId(/category/i);
    expect(categories).toHaveLength(3);

    const search = getByAltText(/search/i);
    expect(search).toBeInTheDocument();

    const spinner = getByTestId(/spinner/i);
    expect(spinner).toBeInTheDocument();

    const errorBtn = getByText(/throw error/i);
    expect(errorBtn).toBeInTheDocument();
  });
  it('testing success data response', async () => {
    server.use(testDataWithFiveResult);

    const { findAllByTestId } = render(
      <BrowserRouter>
        <App />
      </BrowserRouter>
    );

    const cardList = await findAllByTestId(/card/i);

    expect(cardList).toHaveLength(5);
  });
});
