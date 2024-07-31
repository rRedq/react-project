import { http, HttpResponse } from 'msw';
import { DEFAULT_CATEGORY, DEFAULT_URL } from 'shared/consts';
import {
  nullResult,
  resultWithFiveItems,
  resultWithOneItem,
  resultWithTwoItem,
  testItemSpaceResponse,
} from './data';

const handlers = [
  http.get(`${DEFAULT_URL}${DEFAULT_CATEGORY}`, async () => {
    return HttpResponse.json(nullResult);
  }),
  http.get(`${DEFAULT_URL}${DEFAULT_CATEGORY}`, async () => {
    return HttpResponse.json(resultWithFiveItems);
  }),
  http.get(`${DEFAULT_URL}${DEFAULT_CATEGORY}/1`, async () => {
    return HttpResponse.json(testItemSpaceResponse);
  }),
  http.get(`${DEFAULT_URL}${DEFAULT_CATEGORY}`, async () => {
    return HttpResponse.json(resultWithOneItem);
  }),
  http.get(`${DEFAULT_URL}${DEFAULT_CATEGORY}`, async () => {
    return HttpResponse.json(resultWithTwoItem);
  }),
];

const nullResultIndex = 0;
const resultWithFiveItemsIndex = 1;
const resultDetailsIndex = 2;
const resultWithOneItemIndex = 3;
const resultWithDifferentDataIndex = 4;

const testDataWithNullResult = handlers[nullResultIndex];
const testDataWithFiveResult = handlers[resultWithFiveItemsIndex];
const testDataDetails = handlers[resultDetailsIndex];
const testDataWithOneItem = handlers[resultWithOneItemIndex];
const testDataWithTwoDifferentItems = handlers[resultWithDifferentDataIndex];

export {
  testDataWithNullResult,
  testDataWithFiveResult,
  testDataDetails,
  testDataWithOneItem,
  testDataWithTwoDifferentItems,
};
