import { render } from '@testing-library/react';
import RootLayout from 'app/layout';
import Loading from 'app/loading';
import { Header } from 'widgets/Header';

test('testing RootLayout', () => {
  const { getByText, getByTestId } = render(
    <RootLayout>
      <Header />
      <Loading />
    </RootLayout>
  );

  const title = getByText(/Star Wars DB/i);
  expect(title).toBeInTheDocument();

  const spinner = getByTestId(/spinner/i);
  expect(spinner).toBeInTheDocument();
});
