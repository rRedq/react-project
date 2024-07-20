import { http, HttpResponse } from 'msw';
import { DEFAULT_URL } from 'shared/consts';
import { nullResult, resultWithFiveItems } from './data';

const handlers = [
  http.get(`${DEFAULT_URL}species`, async () => {
    return HttpResponse.json(nullResult);
  }),
  http.get(`${DEFAULT_URL}species`, async () => {
    return HttpResponse.json(resultWithFiveItems);
  }),
];

const nullResultIndex = 0;
const resultWithFiveItemsIndex = 1;

const testDataWithNullResult = handlers[nullResultIndex];
const testDataWithFiveResult = handlers[resultWithFiveItemsIndex];

export { testDataWithNullResult, testDataWithFiveResult };
