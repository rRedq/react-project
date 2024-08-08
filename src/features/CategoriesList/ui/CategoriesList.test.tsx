import { act, render } from '@testing-library/react';
import { CategoriesList } from './CategoriesList';
import userEvent from '@testing-library/user-event';
import { vi } from 'vitest';
import { CategoriesType, Paths } from 'shared/types';
import style from './CategoriesList.module.scss';
import { getLocalState } from 'shared/utils/localState';
import { CoreProvider } from 'core/CoreProvider';
import mockRouter from 'next-router-mock';

const speciesTest: CategoriesType = 'species';
const planetsTest: CategoriesType = 'planets';
const starshipTest: CategoriesType = 'starships';

describe('testing CategoriesList', () => {
  afterEach(() => {
    vi.clearAllMocks();
  });

  it('testing count of image for categories to equal 3', () => {
    const { getAllByRole } = render(
      <CoreProvider>
        <CategoriesList />
      </CoreProvider>
    );

    const imgCount = getAllByRole('img');
    expect(imgCount).toHaveLength(3);
  });
  it('testing consecutive different requests', async () => {
    const { getByTestId } = render(
      <CoreProvider>
        <CategoriesList />
      </CoreProvider>
    );

    const planet = getByTestId(planetsTest);
    const starship = getByTestId(starshipTest);
    const species = getByTestId(speciesTest);

    expect(planet).toBeInTheDocument();
    expect(starship).toBeInTheDocument();
    expect(species).toBeInTheDocument();

    expect(species).toHaveClass(style.active);

    await act(async () => await userEvent.click(planet));

    expect(mockRouter.pathname).toBe(`${Paths.MAIN}${planetsTest}`);
    expect(getLocalState('category')).toBe(planetsTest);

    await act(async () => await userEvent.click(starship));
    expect(mockRouter.pathname).toBe(`${Paths.MAIN}${starshipTest}`);
    expect(getLocalState('category')).toBe(starshipTest);
  });
});
