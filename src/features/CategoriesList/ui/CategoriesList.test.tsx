import { act, render } from '@testing-library/react';
import { CategoriesList } from './CategoriesList';
import userEvent from '@testing-library/user-event';
import { vi } from 'vitest';
import { CategoriesType } from 'shared/types';
import { BrowserRouter } from 'react-router-dom';
import { getLocalState } from 'shared/utils/localState';

const speciesTest: CategoriesType = 'species';
const planetsTest: CategoriesType = 'planets';
const starshipsTest: CategoriesType = 'starships';
const searchParam = '?category=';

describe('testing CategoriesList', () => {
  afterEach(() => {
    vi.clearAllMocks();
  });

  it('testing count of image for categories to equal 3', () => {
    const { getAllByRole } = render(
      <BrowserRouter>
        <CategoriesList activeCategory={planetsTest} />
      </BrowserRouter>
    );

    const imgCount = getAllByRole('img');
    expect(imgCount).toHaveLength(3);
  });
  it('testing consecutive different requests', async () => {
    const { getByAltText, getByText } = render(
      <BrowserRouter>
        <CategoriesList activeCategory={planetsTest} />
      </BrowserRouter>
    );

    expect(getByText(planetsTest)).toBeInTheDocument();

    await act(async () => await userEvent.click(getByAltText(speciesTest)));
    expect(getLocalState('category')).toBe(speciesTest);
    expect(location.search).toBe(`${searchParam}${speciesTest}`);

    await act(async () => await userEvent.click(getByAltText(planetsTest)));
    expect(getLocalState('category')).toBe(planetsTest);
    expect(location.search).toBe(`${searchParam}${planetsTest}`);

    await act(async () => await userEvent.click(getByAltText(starshipsTest)));
    expect(getLocalState('category')).toBe(starshipsTest);
    expect(location.search).toBe(`${searchParam}${starshipsTest}`);
  });
  it('testing consecutive identical requests', async () => {
    const { getByAltText, getByText } = render(
      <BrowserRouter>
        <CategoriesList activeCategory={planetsTest} />
      </BrowserRouter>
    );

    expect(getByText(speciesTest)).toBeInTheDocument();

    await act(async () => await userEvent.click(getByAltText(starshipsTest)));
    expect(getLocalState('category')).toBe(starshipsTest);
    expect(location.search).toBe(`${searchParam}${starshipsTest}`);

    await act(async () => await userEvent.click(getByAltText(starshipsTest)));
    expect(getLocalState('category')).toBe(starshipsTest);
    expect(location.search).toBe(`${searchParam}${starshipsTest}`);
  });
});
