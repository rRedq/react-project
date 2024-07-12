import { useEffect } from 'react';

export const useUnmount = (callback: () => void): void => {
  useEffect(() => {
    return () => callback();
  }, []);
};
