import { render } from '@testing-library/react';
import { Spinner } from './Spinner';

test('testing Spinner', () => {
  const { getByTestId } = render(<Spinner />);

  const spinner = getByTestId(/spinner/i);
  expect(spinner).toBeInTheDocument();
});
