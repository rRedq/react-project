import { createRemixStub } from '@remix-run/testing';
import { act, render } from '@testing-library/react';
import { loader } from 'app/routes/home.$category.$details';
import { CoreProvider } from 'core';
import { Main } from 'pages/Main/Main';
import { json } from 'react-router-dom';
import { path, testBaseData } from 'shared/lib/__mock__';

describe('testing SelectController', () => {
  it('testing sequential clicks on checkboxes', async () => {
    const MockMain = createRemixStub([
      {
        path,
        Component: Main,
        loader(): Awaited<ReturnType<typeof loader>> {
          return json(testBaseData);
        },
      },
    ]);
    const { findAllByRole, findByTestId, findByText } = render(
      <CoreProvider>
        <MockMain initialEntries={[path]} />
      </CoreProvider>
    );

    const checkboxes = (await findAllByRole('checkbox')) as HTMLInputElement[];

    expect(checkboxes).toHaveLength(5);

    const firstItem = checkboxes[0];
    const secondItem = checkboxes[1];

    expect(firstItem).toBeInTheDocument();

    expect(firstItem.checked).toEqual(false);
    await act(() => firstItem.click());
    expect(firstItem.checked).toEqual(true);

    let itemsCount = await findByTestId(/itemsCount/i);
    expect(itemsCount).toBeInTheDocument();
    expect(itemsCount.textContent).toBe('1');

    act(() => firstItem.click());
    expect(firstItem.checked).toEqual(false);
    expect(itemsCount).not.toBeInTheDocument();

    expect(secondItem.checked).toEqual(false);
    expect(secondItem).toBeInTheDocument();
    act(() => secondItem.click());
    expect(secondItem.checked).toEqual(true);

    itemsCount = await findByTestId(/itemsCount/i);
    expect(itemsCount.textContent).toBe('1');
    expect(itemsCount).toBeInTheDocument();

    const unselect = await findByText(/Unselect all/i);
    act(() => unselect.click());
    expect(itemsCount).not.toBeInTheDocument();
  });
});
