import { render } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { Card } from './Card';
import { testItemSpaceResponse } from 'shared/lib/__mock__';
import { CoreProvider } from 'core';

describe('testing Card', () => {
  it('testing component renders the relevant card data', () => {
    const { getByText } = render(
      <MemoryRouter>
        <CoreProvider>
          <Card {...testItemSpaceResponse} />
        </CoreProvider>
      </MemoryRouter>
    );

    const name = getByText(testItemSpaceResponse.name);
    expect(name).toBeInTheDocument();

    const lifespan = getByText(testItemSpaceResponse.average_lifespan);
    expect(lifespan).toBeInTheDocument();

    const eye = getByText(testItemSpaceResponse.eye_colors);
    expect(eye).toBeInTheDocument();

    const hair = getByText(testItemSpaceResponse.hair_colors);
    expect(hair).toBeInTheDocument();

    const language = getByText(testItemSpaceResponse.language);
    expect(language).toBeInTheDocument();

    const skin = getByText(testItemSpaceResponse.skin_colors);
    expect(skin).toBeInTheDocument();
  });
});
