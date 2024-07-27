import { CategoriesType, ItemsType, ItemType } from 'shared/types';

interface ItemsSchema {
  items: ItemsType;
}

type OriginalItems = Record<CategoriesType, string[]>;

interface AddPayloadType {
  category: CategoriesType;
  item: ItemType;
}

interface RemovePayloadType {
  category: CategoriesType;
  id: string;
}

export {
  type ItemsSchema,
  type RemovePayloadType,
  type AddPayloadType,
  type OriginalItems,
};
