import { CategoriesType } from 'shared/types';

interface ItemSchema {
  items: { species: string[]; planets: string[]; starships: string[] };
}
interface PayloadType {
  category: CategoriesType;
  item: string;
}

export { type ItemSchema, type PayloadType };
