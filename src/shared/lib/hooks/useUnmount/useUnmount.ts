import { useEffect, useRef } from 'react';
import { SearchProps } from 'shared/types';
import { setLocalState } from 'shared/utils/localState';

export const useUnmount = (
  isUnmount: boolean,
  searchProps?: SearchProps
): void => {
  const searchRef = useRef<SearchProps>();

  useEffect(() => {
    window.addEventListener('beforeunload', unmountHandler);
    if (!searchProps) return;
    searchRef.current = searchProps;

    return () => {
      if (!isUnmount) return;
      if (!searchRef.current?.category) return;
      window.removeEventListener('beforeunload', unmountHandler);
      unmountHandler();
    };
  }, [isUnmount, searchProps]);

  const unmountHandler = () => {
    if (!searchRef.current || !searchRef.current.category) return;
    setLocalState('search', searchRef.current.search || '');
    setLocalState('category', searchRef.current.category);
  };
};
