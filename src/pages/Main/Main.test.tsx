import { BrowserRouter } from 'react-router-dom';
import { Main } from './Main';
import { render } from '@testing-library/react';

test('testing Main', () => {
  const { getByText, getByAltText, getAllByTestId, getByTestId } = render(
    <BrowserRouter>
      <Main />
    </BrowserRouter>
  );

  const logo = getByText(/Star Wars DB/i);
  expect(logo).toBeInTheDocument();

  const categories = getAllByTestId(/caregory/i);
  expect(categories).toHaveLength(3);

  const search = getByAltText(/search/i);
  expect(search).toBeInTheDocument();

  const spiner = getByTestId(/spiner/i);
  expect(spiner).toBeInTheDocument();

  const errorBtn = getByText(/throw error/i);
  expect(errorBtn).toBeInTheDocument();
});
