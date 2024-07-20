import { render } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { setupServer } from 'msw/node';
import { App } from 'app/App';
import { swapi } from 'shared/lib/api/swApi';
import {
  testDataWithFiveResult,
  testDataWithNullResult,
} from 'shared/lib/__mock__';
import { store } from 'app/providers/storeProvider';

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
    const { findAllByTestId, getByTestId } = render(
      <BrowserRouter>
        <App />
      </BrowserRouter>
    );

    const spinner = getByTestId(/spinner/i);
    expect(spinner).toBeInTheDocument();

    const imgCount = await findAllByTestId(/card/i);
    expect(spinner).not.toBeInTheDocument();
    expect(imgCount).toHaveLength(5);
  });
  it('testing number of cards should be equal 0', async () => {
    server.use(testDataWithNullResult);
    const { findByText, getByTestId } = render(
      <BrowserRouter>
        <App />
      </BrowserRouter>
    );

    const spinner = getByTestId(/spinner/i);
    expect(spinner).toBeInTheDocument();

    const placeholderText = await findByText(
      /We have been able to find nothing/i
    );
    expect(spinner).not.toBeInTheDocument();
    expect(placeholderText).toBeInTheDocument();
  });
});
