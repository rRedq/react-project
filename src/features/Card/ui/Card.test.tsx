import { act, render } from '@testing-library/react';
import { vi } from 'vitest';
import { BrowserRouter } from 'react-router-dom';
import { Card } from './Card';
import userEvent from '@testing-library/user-event';
import { store } from 'core/providers/storeProvider';
import { Provider } from 'react-redux';
import { testItemSpaceResponse } from 'shared/lib/__mock__';

describe('testing Card', () => {
  afterEach(() => {
    vi.clearAllMocks();
  });

  it('testing component renders the relevant card data', () => {
    const { getByText } = render(
      <BrowserRouter>
        <Provider store={store}>
          <Card {...testItemSpaceResponse} />
        </Provider>
      </BrowserRouter>
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
      <BrowserRouter>
        <Provider store={store}>
          <Card {...testItemSpaceResponse} />
        </Provider>
      </BrowserRouter>
    );

    const card = getByTestId(/card/i);
    expect(card).toBeInTheDocument();
    await act(async () => {
      await userEvent.click(card);
    });

    const expectedUrl = '?details=1';
    expect(location.search).toBe(expectedUrl);
  });
});
