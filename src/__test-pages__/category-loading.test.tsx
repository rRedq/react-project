import { render } from '@testing-library/react';
import Loading from 'app/category/[...query]/loading';

test('Loading test', () => {
  const { getByTestId } = render(<Loading />);

  const spinner = getByTestId(/spinner/i);
  expect(spinner).toBeInTheDocument();
});
