import { BrowserRouter } from 'react-router-dom';
import { Main } from './Main';
import { render } from '@testing-library/react';
import { http, HttpResponse } from 'msw';
import { DEFAULT_URL } from 'shared/consts';
import { BaseResponse, SpeciesResponse } from 'shared/types';
import { setupServer } from 'msw/node';

const testItem: SpeciesResponse = {
  name: 'Human',
  url: 'https://swapi.dev/api/species/1/',
  average_lifespan: '120',
  eye_colors: 'brown, blue, green, hazel, grey, amber',
  hair_colors: 'blonde, brown, black, red',
  language: 'Galactic Basic',
  skin_colors: 'caucasian, black, asian, hispanic',
};

const testData: BaseResponse = {
  count: 2,
  next: null,
  previous: null,
  results: [testItem, testItem],
};

const handlers = [
  http.get(`${DEFAULT_URL}:category`, async () => {
    return HttpResponse.json(testData);
  }),
  http.get(`${DEFAULT_URL}:category`, async () => {
    return HttpResponse.error();
  }),
];

describe('testing Main', async () => {
  it('testing base shape of main', () => {
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
  it('testing success data response', async () => {
    const server = setupServer(handlers[0]);
    server.listen();

    const { findAllByTestId } = render(
      <BrowserRouter>
        <Main />
      </BrowserRouter>
    );

    const cardList = await findAllByTestId(/card/i);
    expect(cardList).toHaveLength(2);

    server.close();
  });
  it('testing error data response', async () => {
    const server = setupServer(handlers[1]);
    server.listen();

    const { getByTestId, findByTestId } = render(
      <BrowserRouter>
        <Main />
      </BrowserRouter>
    );

    const spiner = getByTestId(/spiner/i);
    expect(spiner).toBeInTheDocument();

    const cover = await findByTestId(/cover/i);
    expect(spiner).not.toBeInTheDocument();

    expect(cover).toBeInTheDocument();
    expect(cover).toBeEmptyDOMElement();
  });
});
