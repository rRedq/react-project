import { act, render } from '@testing-library/react';
import { CategoriesList } from './CategoriesList';
import userEvent from '@testing-library/user-event';
import { vi } from 'vitest';
import { CategoriesType } from 'shared/types';
import { store } from 'app/providers/storeProvider';
import { Provider } from 'react-redux';
import style from './CategoriesList.module.scss';
import { getLocalState } from 'shared/utils/localState';

const speciesTest: CategoriesType = 'species';
const planetsTest: CategoriesType = 'planets';
const starshipTest: CategoriesType = 'starships';

describe('testing CategoriesList', () => {
  afterEach(() => {
    vi.clearAllMocks();
  });

  it('testing count of image for categories to equal 3', () => {
    const { getAllByRole } = render(
      <Provider store={store}>
        <CategoriesList />
      </Provider>
    );

    const imgCount = getAllByRole('img');
    expect(imgCount).toHaveLength(3);
  });
  it('testing consecutive different requests', async () => {
    const { getByTestId } = render(
      <Provider store={store}>
        <CategoriesList />
      </Provider>
    );

    const planet = getByTestId(planetsTest);
    const starship = getByTestId(starshipTest);
    const species = getByTestId(speciesTest);

    expect(planet).toBeInTheDocument();
    expect(starship).toBeInTheDocument();
    expect(species).toBeInTheDocument();

    await act(async () => await userEvent.click(planet));
    expect(planet).toHaveClass(style.active);
    expect(getLocalState('category')).toBe(planetsTest);
    expect(starship).not.toHaveClass(style.active);
    expect(species).not.toHaveClass(style.active);

    await act(async () => await userEvent.click(starship));
    expect(starship).toHaveClass(style.active);
    expect(getLocalState('category')).toBe(starshipTest);
    expect(planet).not.toHaveClass(style.active);
    expect(species).not.toHaveClass(style.active);

    await act(async () => await userEvent.click(species));
    expect(species).toHaveClass(style.active);
    expect(getLocalState('category')).toBe(speciesTest);
    expect(planet).not.toHaveClass(style.active);
    expect(starship).not.toHaveClass(style.active);
  });
  it('testing consecutive identical requests', async () => {
    const { getByTestId } = render(
      <Provider store={store}>
        <CategoriesList />
      </Provider>
    );

    const species = getByTestId(speciesTest);

    expect(species).toBeInTheDocument();
    expect(species).toHaveClass(style.active);
    expect(getLocalState('category')).toBe(speciesTest);

    await act(async () => await userEvent.click(species));
    expect(species).toHaveClass(style.active);
    expect(species).not.toHaveClass(style.common);
    expect(getLocalState('category')).toBe(speciesTest);
  });
});
