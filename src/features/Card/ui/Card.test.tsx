import { act, render } from '@testing-library/react';
import { SpeciesResponse } from 'shared/types';
import { vi } from 'vitest';
import { BrowserRouter } from 'react-router-dom';
import { Card } from './Card';
import userEvent from '@testing-library/user-event';

const testData: SpeciesResponse = {
  name: 'Human',
  url: 'https://swapi.dev/api/species/1/',
  average_lifespan: '120',
  eye_colors: 'brown, blue, green, hazel, grey, amber',
  hair_colors: 'blonde, brown, black, red',
  language: 'Galactic Basic',
  skin_colors: 'caucasian, black, asian, hispanic',
};

describe('testing Card', () => {
  afterEach(() => {
    vi.clearAllMocks();
  });

  it('testing component renders the relevant card data', () => {
    const { getByText, getByAltText } = render(
      <BrowserRouter>
        <Card {...testData} />
      </BrowserRouter>
    );

    const name = getByText(testData.name);
    expect(name).toBeInTheDocument();

    const url = getByAltText(testData.url);
    expect(url).toBeInTheDocument();

    const lifespan = getByText(testData.average_lifespan);
    expect(lifespan).toBeInTheDocument();

    const eye = getByText(testData.eye_colors);
    expect(eye).toBeInTheDocument();

    const hair = getByText(testData.hair_colors);
    expect(hair).toBeInTheDocument();

    const language = getByText(testData.language);
    expect(language).toBeInTheDocument();

    const skin = getByText(testData.skin_colors);
    expect(skin).toBeInTheDocument();
  });
  it('testing clicking on a card opens a detailed card component', async () => {
    const { getByTestId } = render(
      <BrowserRouter>
        <Card {...testData} />
      </BrowserRouter>
    );

    const card = getByTestId(/card/i);
    expect(card).toBeInTheDocument();
    await act(async () => {
      await userEvent.click(card);
    });

    const expectedUrl = '?details=species%2F1';
    expect(location.search).toBe(expectedUrl);
  });
});
