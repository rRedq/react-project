import { http, HttpResponse } from 'msw';
import { DEFAULT_URL } from 'shared/consts';
import {
  nullResult,
  resultWithFiveItems,
  resultWithOneItem,
  testItemSpaceResponse,
} from './data';

const handlers = [
  http.get(`${DEFAULT_URL}species`, async () => {
    return HttpResponse.json(nullResult);
  }),
  http.get(`${DEFAULT_URL}species`, async () => {
    return HttpResponse.json(resultWithFiveItems);
  }),
  http.get(`${DEFAULT_URL}species/1`, async () => {
    return HttpResponse.json(testItemSpaceResponse);
  }),
  http.get(`${DEFAULT_URL}species`, async () => {
    return HttpResponse.json(resultWithOneItem);
  }),
];

const nullResultIndex = 0;
const resultWithFiveItemsIndex = 1;
const resultDetailsIndex = 2;
const resultWithOneItemIndex = 3;

const testDataWithNullResult = handlers[nullResultIndex];
const testDataWithFiveResult = handlers[resultWithFiveItemsIndex];
const testDataDetails = handlers[resultDetailsIndex];
const testDataWithOneItem = handlers[resultWithOneItemIndex];

export {
  testDataWithNullResult,
  testDataWithFiveResult,
  testDataDetails,
  testDataWithOneItem,
};
