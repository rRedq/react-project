import { CategoriesType, ItemsType } from 'shared/types';

interface ItemsSchema {
  items: ItemsType;
}

interface PayloadType {
  category: CategoriesType;
  item: string;
}

export { type ItemsSchema, type PayloadType };
