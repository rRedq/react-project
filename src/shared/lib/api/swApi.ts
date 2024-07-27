import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { DEFAULT_PAGE, DEFAULT_URL } from 'shared/consts';
import {
  BaseDataType,
  BaseResponse,
  CategoriesType,
  CombinedTypeDetails,
  SearchProps,
} from 'shared/types';
import { baseDataConverter } from '../dataConverters';

type getDataType = {
  category: CategoriesType;
  card: string;
};

export const swapi = createApi({
  reducerPath: 'swapi',
  baseQuery: fetchBaseQuery({ baseUrl: DEFAULT_URL }),
  endpoints: (builder) => ({
    getData: builder.query<BaseDataType, SearchProps>({
      query: ({ category, search, page }) => {
        let query = '';
        if (search) query = `?search=${search}`;
        if (page && page !== DEFAULT_PAGE) {
          query += search ? `&page=${page}` : `?page=${page}`;
        }

        return `${category}${query}`;
      },
      transformResponse: (
        response: BaseResponse,
        _,
        { category }: SearchProps
      ) => baseDataConverter(response, category),
    }),
    getDetailsData: builder.query<CombinedTypeDetails, getDataType>({
      query: ({ category, card }) => `${DEFAULT_URL}${category}/${card}`,
    }),
  }),
});

export const { useGetDataQuery, useGetDetailsDataQuery } = swapi;

export const swapiReducer = swapi.reducer;
