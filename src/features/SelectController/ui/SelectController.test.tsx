import { act, render } from '@testing-library/react';
import { CoreProvider } from 'core/CoreProvider';
import { setupServer } from 'msw/node';
import { Main } from 'pages/Main/Main';
import {
  resultWithTwoItem,
  testDataWithTwoDifferentItems,
} from 'shared/lib/__mock__';

const server = setupServer();

beforeAll(() => {
  server.listen();
});

afterAll(() => {
  server.close();
});

describe('testing SelectController', () => {
  it('testing sequential clicks on checkboxes', async () => {
    server.use(testDataWithTwoDifferentItems);
    const { findAllByRole, findByTestId, findByText } = render(
      <CoreProvider>
        <Main />
      </CoreProvider>
    );

    const checkboxes = (await findAllByRole('checkbox')) as HTMLInputElement[];

    expect(checkboxes).toHaveLength(2);

    const firstItem = checkboxes[0];
    const secondItem = checkboxes[1];

    expect(firstItem).toBeInTheDocument();

    expect(firstItem.checked).toEqual(false);
    act(() => firstItem.click());
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

  it('testing overlapping clicks on checkboxes', async () => {
    server.use(testDataWithTwoDifferentItems);
    const { findByTestId, findByText } = render(
      <CoreProvider>
        <Main />
      </CoreProvider>
    );
    const firstCheckbox = await findByTestId(resultWithTwoItem.results[0].name);
    const secondCheckbox = await findByTestId(
      resultWithTwoItem.results[1].name
    );
    act(() => firstCheckbox.click());
    act(() => secondCheckbox.click());
    const itemsCount = await findByTestId(/itemsCount/i);

    expect(itemsCount.textContent).toBe('2');
    const unselect = await findByText(/Unselect all/i);
    act(() => unselect.click());
    expect(itemsCount).not.toBeInTheDocument();
  });
});
