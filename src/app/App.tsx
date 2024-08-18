import { FC } from 'react';
import { RouterProvider } from 'react-router-dom';
import { router, store } from './providers';
import './styles/global.scss';
import { Provider } from 'react-redux';

export const App: FC = () => {
  return (
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  );
};
