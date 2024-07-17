import { render } from '@testing-library/react';
import { vi } from 'vitest';
import { CardList } from './CardList';
import { BrowserRouter } from 'react-router-dom';

// const testItem: SpeciesResponse = {
//   name: 'Human',
//   url: 'https://swapi.dev/api/species/1/',
//   average_lifespan: '120',
//   eye_colors: 'brown, blue, green, hazel, grey, amber',
//   hair_colors: 'blonde, brown, black, red',
//   language: 'Galactic Basic',
//   skin_colors: 'caucasian, black, asian, hispanic',
// };

// const testData = [testItem, testItem, testItem, testItem, testItem];

describe('testing CardList', () => {
  afterEach(() => {
    vi.clearAllMocks();
  });

  it('testing number of cards should be equal 5', () => {
    const { getAllByRole } = render(
      <BrowserRouter>
        <CardList />
      </BrowserRouter>
    );

    const imgCount = getAllByRole('img');
    expect(imgCount).toHaveLength(5);
  });
  it('testing number of cards should be equal 0', () => {
    const { getByText } = render(
      <BrowserRouter>
        <CardList />
      </BrowserRouter>
    );

    const placeholderText = getByText(/We have been able to find nothing/i);
    expect(placeholderText).toBeInTheDocument();
  });
});
