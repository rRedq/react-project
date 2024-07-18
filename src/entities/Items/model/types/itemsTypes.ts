import { CategoriesType } from 'shared/types';

interface ItemsSchema {
  items: { species: string[]; planets: string[]; starships: string[] };
}
interface PayloadType {
  category: CategoriesType;
  item: string;
}

export { type ItemsSchema, type PayloadType };
