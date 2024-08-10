import { render } from '@testing-library/react';
import { path, testBaseData, testItemSpaceResponse } from 'shared/lib/__mock__';
import { act } from 'react';
import { CardList } from './CardList';
import { CoreProvider } from 'core';
import { createRemixStub } from '@remix-run/testing';
import { loader } from 'app/routes/home.$category';
import { json } from '@remix-run/node';
import { CardDetails } from 'features/CardDetails';
import { loader as detailsLoader } from 'app/routes/home.$category.$details';

describe('testing CardList', () => {
  it('testing number of cards should be equal 0', async () => {
    const MockCardList = createRemixStub([
      {
        path,
        Component: CardList,
        loader(): Awaited<ReturnType<typeof loader>> {
          return json({ data: [] });
        },
      },
    ]);
    const { findByText } = render(
      <CoreProvider>
        <MockCardList initialEntries={[path]} />
      </CoreProvider>
    );

    const placeholderText = await findByText(
      /We have been able to find nothing/i
    );
    expect(placeholderText).toBeInTheDocument();
  });
  it('testing click to close details', async () => {
    const MockCardList = createRemixStub([
      {
        path,
        Component: CardList,
        loader(): Awaited<ReturnType<typeof loader>> {
          return json(testBaseData);
        },
      },
      {
        path: `${path}/1`,
        Component: CardDetails,
        loader(): Awaited<ReturnType<typeof detailsLoader>> {
          return json(testItemSpaceResponse);
        },
      },
    ]);
    const { findAllByTestId, findByTestId } = render(
      <CoreProvider>
        <MockCardList initialEntries={[path]} />
      </CoreProvider>
    );

    const cards = await findAllByTestId(/card/i);
    expect(cards).toHaveLength(5);

    await act(() => cards[0].click());

    const details = await findByTestId(/details/i);
    expect(details).toBeInTheDocument();

    const close = await findByTestId(/close/i);
    await act(() => close.click());

    expect(details).not.toBeInTheDocument();
  });
});
