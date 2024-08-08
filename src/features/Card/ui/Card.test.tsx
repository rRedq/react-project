import { act, render } from '@testing-library/react';
import { vi } from 'vitest';
import { Card } from './Card';
import userEvent from '@testing-library/user-event';
import { testItemSpaceResponse } from 'shared/lib/__mock__';
import mockRouter from 'next-router-mock';
import { CoreProvider } from 'core/CoreProvider';
import { DEFAULT_CATEGORY } from 'shared/consts';
import { Paths } from 'shared/types';

describe('testing Card', () => {
  afterEach(() => {
    vi.clearAllMocks();
  });

  it('testing component renders the relevant card data', () => {
    const { getByText } = render(
      <CoreProvider>
        <Card {...testItemSpaceResponse} />
      </CoreProvider>
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
  it('testing clicking on a card opens a detailed card component', async () => {
    const { getByTestId } = render(
      <CoreProvider>
        <Card {...testItemSpaceResponse} />
      </CoreProvider>
    );

    const card = getByTestId(/card/i);
    expect(card).toBeInTheDocument();
    await act(async () => {
      await userEvent.click(card);
    });

    expect(mockRouter.pathname).toBe(`${Paths.MAIN}${DEFAULT_CATEGORY}/1`);
  });
});
