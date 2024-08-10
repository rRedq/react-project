import { render } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { setupServer } from 'msw/node';
import { CoreProvider } from 'core/App';
import { swapi } from 'shared/lib/api/swApi';
import {
  testDataDetails,
  testDataWithNullResult,
  testDataWithOneItem,
} from 'shared/lib/__mock__';
import { store } from 'core/providers/storeProvider';
import { act } from 'react';
import { CardList } from './CardList';
import { Provider } from 'react-redux';

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
  it('testing number of cards should be equal 0', async () => {
    server.use(testDataWithNullResult);
    const { findByText, getByTestId } = render(
      <BrowserRouter>
        <Provider store={store}>
          <CardList />
        </Provider>
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
  it('testing click to close details', async () => {
    server.use(testDataWithOneItem);
    server.use(testDataDetails);
    const { findByTestId } = render(
      <BrowserRouter>
        <CoreProvider />
      </BrowserRouter>
    );

    const card = await findByTestId(/card/i);
    expect(card).toBeInTheDocument();

    act(() => card.click());
    const details = await findByTestId(/details/i);
    const cover = await findByTestId(/cover/i);
    expect(details).toBeInTheDocument();
    expect(cover).toBeInTheDocument();

    act(() => cover.click());
    expect(details).not.toBeInTheDocument();
  });
});
