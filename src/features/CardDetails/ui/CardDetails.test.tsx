import { act, render } from '@testing-library/react';
import { BrowserRouter, MemoryRouter } from 'react-router-dom';
import { CardDetails } from './CardDetails';
import { setupServer } from 'msw/node';
import { store } from 'core/providers/storeProvider';
import { Provider } from 'react-redux';
import { CoreProvider } from 'core/App';
import { testDataDetails, testDataWithOneItem } from 'shared/lib/__mock__';
import { swapi } from 'shared/lib/api/swApi';
import { testItemSpaceResponse } from 'shared/lib/__mock__/data';
import { basePath, detailsPath } from 'shared/lib/__mock__/variables';

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

describe('testing CardDetails', () => {
  it('testing information display', async () => {
    server.use(testDataDetails);
    const { findByText, getByTestId } = render(
      <MemoryRouter initialEntries={[detailsPath]}>
        <Provider store={store}>
          <CardDetails />
        </Provider>
      </MemoryRouter>
    );

    const loading = getByTestId(/spinner/i);
    expect(loading).toBeInTheDocument();

    const name = await findByText(testItemSpaceResponse.name);

    expect(loading).not.toBeInTheDocument();
    expect(name).toBeInTheDocument();

    const closeBtn = getByTestId(/close/i);
    expect(closeBtn).toBeInTheDocument();

    const language = await findByText(testItemSpaceResponse.language);
    expect(language).toBeInTheDocument();
  });
  it('testing opening / closing CardDetails', async () => {
    server.use(testDataWithOneItem);
    server.use(testDataDetails);
    const { findByTestId } = render(
      <BrowserRouter>
        <CoreProvider />
      </BrowserRouter>
    );

    expect(location.search).toBe(basePath);
    const card = await findByTestId(/card/i);
    expect(card).toBeInTheDocument();

    act(() => card.click());

    expect(location.search).toBe(detailsPath);
    const details = await findByTestId(/details/i);
    const closeBtn = await findByTestId(/close/i);
    expect(details).toBeInTheDocument();
    expect(closeBtn).toBeInTheDocument();

    act(() => closeBtn.click());
    expect(location.search).toBe(basePath);
    expect(details).not.toBeInTheDocument();
    expect(closeBtn).not.toBeInTheDocument();
  });
});
