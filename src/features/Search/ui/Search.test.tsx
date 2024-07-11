import { vi } from 'vitest';
import { Search } from './Search';
import { render } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

describe('testing Search component', () => {
  const mockUpdateSearch = vi.fn();

  afterEach(() => {
    vi.clearAllMocks();
  });

  it('testing reset button', async () => {
    const { getByPlaceholderText, getByText, getByAltText } = render(
      <Search updateSearch={mockUpdateSearch} />
    );

    const searchImput: HTMLElement = getByPlaceholderText('search');
    const searchBtn: HTMLElement = getByAltText('search');

    const testStr = 'test';
    const anotherStr = 'cr';
    const emptyStr = '';

    expect(searchImput).toBeInTheDocument();
    expect(searchImput).toBeEmptyDOMElement();

    await userEvent.type(searchImput, `${testStr}{enter}`);
    expect(searchImput).toHaveValue(testStr);
    expect(mockUpdateSearch).toHaveBeenCalledTimes(1);
    expect(mockUpdateSearch).toHaveBeenCalledWith(testStr);
    await userEvent.type(searchImput, anotherStr);

    const cancelBtn: HTMLElement = getByText('X');

    expect(cancelBtn).toBeDefined();
    await cancelBtn.click();
    expect(mockUpdateSearch).toHaveBeenCalledTimes(2);
    expect(mockUpdateSearch).toHaveBeenCalledWith(emptyStr);
    expect(searchImput).toHaveValue(emptyStr);

    expect(searchBtn).toBeDefined();
    await userEvent.type(searchImput, anotherStr);
    searchBtn.click();
    expect(mockUpdateSearch).toHaveBeenCalledTimes(3);
    expect(mockUpdateSearch).toHaveBeenCalledWith(anotherStr);
  });
  it('testing two consecutive positive requests', async () => {
    const { getByPlaceholderText, getByAltText } = render(
      <Search updateSearch={mockUpdateSearch} />
    );

    const searchImput: HTMLElement = getByPlaceholderText('search');
    const searchBtn: HTMLElement = getByAltText('search');

    const testStr = 'test';
    const anotherStr = 'another test';

    expect(searchBtn).toBeDefined();
    expect(searchImput).toBeInTheDocument();
    expect(searchImput).toBeEmptyDOMElement();
    await userEvent.type(searchImput, `${testStr}{enter}`);
    expect(searchImput).toHaveValue(testStr);
    expect(mockUpdateSearch).toHaveBeenCalledTimes(1);
    expect(mockUpdateSearch).toHaveBeenCalledWith(testStr);

    await userEvent.type(searchImput, anotherStr);
    searchBtn.click();
    expect(mockUpdateSearch).toHaveBeenCalledTimes(2);
    expect(mockUpdateSearch).toHaveBeenCalledWith(`${testStr}${anotherStr}`);
  });
});
