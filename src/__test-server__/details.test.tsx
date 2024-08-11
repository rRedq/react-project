import { createRemixStub } from '@remix-run/testing';
import { render } from '@testing-library/react';
import DetailsPage, { loader } from 'app/routes/home.$category.$details';
import { CoreProvider } from 'core';
import { json } from 'react-router-dom';
import { path, testItemSpaceResponse } from 'shared/lib/__mock__';

const detailsPath = `${path}/1`;

test('testing Details server component', async () => {
  const MockDetailsPage = createRemixStub([
    {
      path: detailsPath,
      Component: DetailsPage,
      loader(): Awaited<ReturnType<typeof loader>> {
        return json(testItemSpaceResponse);
      },
    },
  ]);
  const { findByTestId } = render(
    <CoreProvider>
      <MockDetailsPage initialEntries={[detailsPath]} />
    </CoreProvider>
  );

  const details = await findByTestId(/details/i);
  expect(details).toBeInTheDocument();

  const close = await findByTestId(/close/i);
  expect(close).toBeInTheDocument();
});
