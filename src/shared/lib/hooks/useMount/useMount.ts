import { useEffect } from 'react';

export const useMount = (callback: () => void): void => {
  useEffect(() => callback(), []);
};
