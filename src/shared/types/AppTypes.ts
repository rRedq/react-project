import { CombinedType } from './ResponseTypes';

interface ErrorState {
  hasError: boolean;
}

interface BaseDataType {
  count?: number;
  data: CombinedType;
}

export { type ErrorState, type BaseDataType };
