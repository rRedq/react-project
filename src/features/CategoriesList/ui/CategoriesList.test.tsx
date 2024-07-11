import { act, render } from '@testing-library/react';
import { CategoriesList } from './CategoriesList';
import userEvent from '@testing-library/user-event';
import { vi } from 'vitest';
import { CategoriesType } from 'shared/types';

describe('testing CategoriesList', () => {
  const mockUpdateCategory = vi.fn();

  afterEach(() => {
    vi.clearAllMocks();
  });

  it('testing consecutive different requests', async () => {
    const speciesTest: CategoriesType = 'species';
    const planetsTest: CategoriesType = 'planets';
    const starshipsTest: CategoriesType = 'starships';

    const { getByAltText, getByText } = render(
      <CategoriesList
        activeCategory={planetsTest}
        updateCategory={mockUpdateCategory}
      />
    );

    expect(getByText(planetsTest)).toBeInTheDocument();

    await act(async () => await userEvent.click(getByAltText(speciesTest)));
    expect(mockUpdateCategory).toHaveBeenCalledWith(speciesTest);
    expect(mockUpdateCategory).toHaveBeenCalledTimes(1);

    await act(async () => await userEvent.click(getByAltText(planetsTest)));
    expect(mockUpdateCategory).toHaveBeenCalledWith(planetsTest);
    expect(mockUpdateCategory).toHaveBeenCalledTimes(2);

    await act(async () => await userEvent.click(getByAltText(starshipsTest)));
    expect(mockUpdateCategory).toHaveBeenCalledWith(starshipsTest);
    expect(mockUpdateCategory).toHaveBeenCalledTimes(3);
  });
  it('testing consecutive identical requests', async () => {
    const speciesTest: CategoriesType = 'species';
    const starshipsTest: CategoriesType = 'starships';

    const { getByAltText, getByText } = render(
      <CategoriesList
        activeCategory={speciesTest}
        updateCategory={mockUpdateCategory}
      />
    );

    expect(getByText(speciesTest)).toBeInTheDocument();

    await act(async () => await userEvent.click(getByAltText(starshipsTest)));
    expect(mockUpdateCategory).toHaveBeenCalledWith(starshipsTest);
    expect(mockUpdateCategory).toHaveBeenCalledTimes(1);

    await act(async () => await userEvent.click(getByAltText(starshipsTest)));
    expect(mockUpdateCategory).toHaveBeenCalledWith(starshipsTest);
    expect(mockUpdateCategory).toHaveBeenCalledTimes(2);

    await act(async () => await userEvent.click(getByAltText(starshipsTest)));
    expect(mockUpdateCategory).toHaveBeenCalledWith(starshipsTest);
    expect(mockUpdateCategory).toHaveBeenCalledTimes(3);

    await act(async () => await userEvent.click(getByAltText(starshipsTest)));
    expect(mockUpdateCategory).toHaveBeenCalledWith(starshipsTest);
    expect(mockUpdateCategory).toHaveBeenCalledTimes(4);
  });
});
