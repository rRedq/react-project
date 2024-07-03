import React from 'react';
import { AppProps } from '../../types';

export const Context: React.Context<AppProps> = React.createContext<AppProps>({
  data: null,
  isLoading: false,
});
