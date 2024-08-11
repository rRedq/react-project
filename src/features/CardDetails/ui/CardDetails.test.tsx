import { render } from '@testing-library/react';
import { json } from 'react-router-dom';
import { CardDetails } from './CardDetails';
import { testItemSpaceResponse } from 'shared/lib/__mock__/data';
import { path } from 'shared/lib/__mock__/variables';
import { CoreProvider } from 'core';
import { createRemixStub } from '@remix-run/testing';
import { loader } from 'app/routes/home.$category.$details';

describe('testing CardDetails', () => {
  it('testing information display', async () => {
    const detailsPath = `${path}/1`;
    const MockCardDetails = createRemixStub([
      {
        path: detailsPath,
        Component: CardDetails,
        loader(): Awaited<ReturnType<typeof loader>> {
          return json(testItemSpaceResponse);
        },
      },
    ]);
    const { findByText, getByTestId } = render(
      <CoreProvider>
        <MockCardDetails initialEntries={[detailsPath]} />
      </CoreProvider>
    );

    const name = await findByText(testItemSpaceResponse.name);
    expect(name).toBeInTheDocument();

    const closeBtn = getByTestId(/close/i);
    expect(closeBtn).toBeInTheDocument();

    const language = await findByText(testItemSpaceResponse.language);
    expect(language).toBeInTheDocument();
  });
});
