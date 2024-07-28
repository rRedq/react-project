import { act, render } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { CardDetails } from './CardDetails';
import { setupServer } from 'msw/node';
import { store } from 'core/providers/storeProvider';
import { Provider } from 'react-redux';
import { testDataDetails, testDataWithOneItem } from 'shared/lib/__mock__';
import { swapi } from 'shared/lib/api/swApi';
import { testItemSpaceResponse } from 'shared/lib/__mock__/data';
import { basePath, detailsPath } from 'shared/lib/__mock__/variables';
import mockRouter from 'next-router-mock';
import { Main } from 'pages/Main/Main';
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
      <CoreProvider>
        <Main />
      </CoreProvider>
    );

    expect(mockRouter.query.page).toBe(basePath);
    const card = await findByTestId(/card/i);
    expect(card).toBeInTheDocument();

    act(() => card.click());

    expect(mockRouter.query).toEqual({
      details: '1',
      page: '1',
    });
  });
});
