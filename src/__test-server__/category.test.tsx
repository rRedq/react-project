import { createRemixStub } from '@remix-run/testing';
import { render } from '@testing-library/react';
import MainPage from 'app/routes/home.$category';
import { loader } from 'app/routes/home.$category.$details';
import { CoreProvider } from 'core';
import { json } from 'react-router-dom';
import { path, testBaseData } from 'shared/lib/__mock__';

test('testing Category server component', async () => {
  const MockMainPage = createRemixStub([
    {
      path,
      Component: MainPage,
      loader(): Awaited<ReturnType<typeof loader>> {
        return json(testBaseData);
      },
    },
  ]);
  const { findByText, findAllByTestId } = render(
    <CoreProvider>
      <MockMainPage initialEntries={[path]} />
    </CoreProvider>
  );

  const label = await findByText(/Star Wars DB/i);
  expect(label).toBeInTheDocument();

  const cards = await findAllByTestId(/card/i);
  expect(cards).toHaveLength(5);
});
