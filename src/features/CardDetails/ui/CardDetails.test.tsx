import { act, render } from '@testing-library/react';
import {
  testItemPlanetsResponse,
  testItemSpaceResponse,
} from 'shared/lib/__mock__/data';
import mockRouter from 'next-router-mock';
import { CoreProvider } from 'core/CoreProvider';
import { DEFAULT_CATEGORY } from 'shared/consts';
import { CardDetails } from './CardDetails';

describe('testing CardDetails', () => {
  it('testing opening / closing CardDetails', async () => {
    mockRouter.push({
      query: { page: '1', details: '1', category: DEFAULT_CATEGORY },
    });
    const { findByTestId } = render(
      <CoreProvider>
        <CardDetails data={testItemSpaceResponse} />
      </CoreProvider>
    );

    expect(mockRouter.query.category).toBe(DEFAULT_CATEGORY);
    const card = await findByTestId(/details/i);
    expect(card).toBeInTheDocument();

    act(() => card.click());

    expect(mockRouter.query).toEqual({
      details: '1',
      page: '1',
      category: DEFAULT_CATEGORY,
    });
  });
  it('testing information display', async () => {
    const { findByText, getByTestId } = render(
      <CoreProvider>
        <CardDetails data={testItemPlanetsResponse} />
      </CoreProvider>
    );

    const name = await findByText(testItemPlanetsResponse.name);
    expect(name).toBeInTheDocument();

    const closeBtn = getByTestId(/close/i);
    expect(closeBtn).toBeInTheDocument();

    const population = await findByText(testItemPlanetsResponse.population);
    expect(population).toBeInTheDocument();
  });
});
