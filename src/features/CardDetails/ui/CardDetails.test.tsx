import { render } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { CardDetails, CardDetailsProps } from './CardDetails';
import { http, HttpResponse } from 'msw';
import { DEFAULT_URL } from 'shared/consts';
import { setupServer } from 'msw/node';
import { SpeciesResponse } from 'shared/types';

const searchPath = '/?details=species%2F1';

const testData: SpeciesResponse = {
  name: 'Human',
  url: 'https://swapi.dev/api/species/1/',
  average_lifespan: '120',
  eye_colors: 'brown, blue, green, hazel, grey, amber',
  hair_colors: 'blonde, brown, black, red',
  language: 'Galactic Basic',
  skin_colors: 'caucasian, black, asian, hispanic',
};

const data: CardDetailsProps = {
  category: 'species',
  card: '1',
};

const { card, category } = data;

const handlers = [
  http.get(`${DEFAULT_URL}${category}/${card}`, async () => {
    return HttpResponse.json(testData);
  }),
];

const server = setupServer(...handlers);

beforeAll(() => {
  server.listen();
});

afterAll(() => {
  server.close();
});

test('testing CardDetails', async () => {
  const { findByText, getByTestId } = render(
    <MemoryRouter initialEntries={[searchPath]}>
      <CardDetails />
    </MemoryRouter>
  );
  const loading = getByTestId(/spinner/i);
  expect(loading).toBeInTheDocument();

  const name = await findByText(testData.name);

  expect(loading).not.toBeInTheDocument();
  expect(name).toBeInTheDocument();

  const closeBtn = getByTestId(/close/i);
  expect(closeBtn).toBeInTheDocument();

  const language = await findByText(testData.language);
  expect(language).toBeInTheDocument();
});
