import { render } from '@testing-library/react';
import { testItemPlanetsResponse } from 'shared/lib/__mock__/data';
import { CoreProvider } from 'core/CoreProvider';
import { CardDetails } from './CardDetails';

it('testing CardDetails', async () => {
  const { findByText, getByTestId } = render(
    <CoreProvider>
      <CardDetails data={testItemPlanetsResponse} />
    </CoreProvider>
  );

  const name = await findByText(testItemPlanetsResponse.name);
  expect(name).toBeInTheDocument();

  const closeBtn = getByTestId(/close/i);
  expect(closeBtn).toBeInTheDocument();

  const population = await findByText(testItemPlanetsResponse.population);
  expect(population).toBeInTheDocument();
});
