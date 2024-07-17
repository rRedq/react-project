import { getLocalState } from 'shared/utils/localState';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { CategoriesType, SearchProps } from 'shared/types';
import { DEFAULT_CATEGORY } from 'shared/consts';

const initialState: SearchProps = {
  category: getLocalState('category') || DEFAULT_CATEGORY,
  search: getLocalState('search'),
};

export const searchSlice = createSlice({
  name: 'search',
  initialState,
  reducers: {
    setCategory(
      state: SearchProps,
      { payload }: PayloadAction<CategoriesType>
    ) {
      state.category = payload;
    },
    setSearch(
      state: SearchProps,
      { payload }: PayloadAction<string | undefined>
    ) {
      state.search = payload;
    },
  },
});

export const { reducer: searchReducer } = searchSlice;

export const { setCategory, setSearch } = searchSlice.actions;
