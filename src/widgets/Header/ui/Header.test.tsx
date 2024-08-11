import { render } from '@testing-library/react';
import { Header } from './Header';
import { CoreProvider } from 'core/CoreProvider';

test('testing Header', () => {
  const { getByText } = render(
    <CoreProvider>
      <Header />
    </CoreProvider>
  );

  const label = getByText(/Star Wars DB/i);
  expect(label).toBeInTheDocument();
});
