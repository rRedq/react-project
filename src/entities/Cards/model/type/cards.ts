import { BaseDataType } from 'shared/types';

interface CardsSchema {
  cards: BaseDataType[];
  countries: string[];
  animate: boolean;
}

export { type CardsSchema };
