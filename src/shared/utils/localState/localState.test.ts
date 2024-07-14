import { CategoriesType } from 'shared/types';
import { getLocalState, setLocalState, StorageKeys } from './localState';

describe('testing localState', () => {
  afterEach(() => {
    localStorage.clear();
  });

  it('testing category key', () => {
    const key: StorageKeys = 'category';
    const unusedKey: StorageKeys = 'search';
    const testData: CategoriesType = 'planets';

    setLocalState(key, testData);

    expect(getLocalState(key)).toBe(testData);
    expect(getLocalState(unusedKey)).toBeUndefined();
  });
  it('testing search key', () => {
    const key: StorageKeys = 'search';
    const unusedKey: StorageKeys = 'category';
    const testData: string = 'test';

    setLocalState(key, testData);

    expect(getLocalState(key)).toBe(testData);
    expect(getLocalState(unusedKey)).toBeUndefined();
  });
});
