import { render } from '@testing-library/react';
import { setupServer } from 'msw/node';
import {
  testDataDetails,
  testDataWithFiveResult,
  testDataWithNullResult,
  testDataWithOneItem,
} from 'shared/lib/__mock__';
import { act } from 'react';
import mockRouter from 'next-router-mock';
import { CoreProvider } from 'core/CoreProvider';
import { DEFAULT_CATEGORY } from 'shared/consts';
import {
  nullResult,
  resultWithFiveItems,
  resultWithOneItem,
} from 'shared/lib/__mock__/data';

import { CardList } from './CardList';

const server = setupServer();

beforeAll(() => {
  server.listen();
  mockRouter.push({
    query: { category: DEFAULT_CATEGORY },
  });
});

beforeEach(() => {
  server.resetHandlers();
});

afterAll(() => {
  server.close();
});

describe('testing CardList', () => {
  it('testing number of cards should be equal 5', async () => {
    server.use(testDataWithFiveResult);
    const { findAllByTestId } = render(
      <CoreProvider>
        <CardList data={resultWithFiveItems} />
      </CoreProvider>
    );

    const imgCount = await findAllByTestId(/card/i);

    expect(imgCount).toHaveLength(5);
  });
  it('testing number of cards should be equal 0', async () => {
    server.use(testDataWithNullResult);
    const { findByText } = render(
      <CoreProvider>
        <CardList data={nullResult} />
      </CoreProvider>
    );

    const placeholderText = await findByText(
      /We have been able to find nothing/i
    );
    expect(placeholderText).toBeInTheDocument();
  });
  it('testing click to close details', async () => {
    server.use(testDataWithOneItem);
    server.use(testDataDetails);
    const { findByTestId } = render(
      <CoreProvider>
        <CardList data={resultWithOneItem} />
      </CoreProvider>
    );

    const card = await findByTestId(/card/i);
    expect(card).toBeInTheDocument();

    act(() => card.click());

    expect(mockRouter.pathname).toBe(`/${DEFAULT_CATEGORY}/1`);
  });
});
