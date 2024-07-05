const STORE_KEY = 'redq-store';

type StorageKeys = 'category' | 'search';

const setLocalState = (key: StorageKeys, value: string): void => {
  let storage: Map<StorageKeys, string> | undefined = getLocalParseState();
  if (!storage) storage = new Map<StorageKeys, string>();
  storage.set(key, value);
  localStorage.setItem(STORE_KEY, JSON.stringify(Array.from(storage)));
};

const getLocalState = (key: StorageKeys): string | void => {
  const state: Map<StorageKeys, string> | undefined = getLocalParseState();

  return state ? state.get(key) : undefined;
};

const getLocalParseState = (): Map<StorageKeys, string> | undefined => {
  const state: string | null = localStorage.getItem(STORE_KEY);

  if (!state) return;

  const storage: Map<StorageKeys, string> = new Map<StorageKeys, string>(
    JSON.parse(state)
  );

  return storage;
};

export { setLocalState, getLocalState };
