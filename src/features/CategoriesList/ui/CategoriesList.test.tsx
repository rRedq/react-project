import { act, render } from '@testing-library/react';
import { CategoriesList } from './CategoriesList';
import userEvent from '@testing-library/user-event';
import { vi } from 'vitest';
import { CategoriesType } from 'shared/types';
import { MemoryRouter } from 'react-router-dom';
import { getLocalState } from 'shared/utils/localState';
import { CoreProvider } from 'core';

const speciesTest: CategoriesType = 'species';
const planetsTest: CategoriesType = 'planets';
const starshipTest: CategoriesType = 'starships';

describe('testing CategoriesList', () => {
  afterEach(() => {
    vi.clearAllMocks();
  });

  it('testing count of image for categories to equal 3', () => {
    const { getAllByRole } = render(
      <MemoryRouter>
        <CoreProvider>
          <CategoriesList />
        </CoreProvider>
      </MemoryRouter>
    );

    const imgCount = getAllByRole('img');
    expect(imgCount).toHaveLength(3);
  });
  it('testing consecutive different requests', async () => {
    const { getByTestId } = render(
      <MemoryRouter>
        <CoreProvider>
          <CategoriesList />
        </CoreProvider>
      </MemoryRouter>
    );

    const planet = getByTestId(planetsTest);
    const starship = getByTestId(starshipTest);
    const species = getByTestId(speciesTest);

    expect(planet).toBeInTheDocument();
    expect(starship).toBeInTheDocument();
    expect(species).toBeInTheDocument();

    await act(async () => await userEvent.click(planet));
    expect(getLocalState('category')).toBe(planetsTest);

    await act(async () => await userEvent.click(starship));
    expect(getLocalState('category')).toBe(starshipTest);
  });
});
