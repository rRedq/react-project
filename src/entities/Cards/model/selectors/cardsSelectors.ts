import { RootState } from 'app/providers/store/store';

const getCards = (state: RootState) => state.cards.cards;

const getCountries = (state: RootState) => state.cards.countries;

export { getCards, getCountries };
