import { ReactNode } from 'react';
import { Route, Routes } from 'react-router-dom';
import { rootRouter, Router } from '../config/rootRouter';

export const RouteProvider = (): ReactNode => {
  return (
    <Routes>
      (
      {rootRouter.map((route: Router) => (
        <Route
          key={route.path}
          path={route.path}
          element={route.element}
        ></Route>
      ))}
      )
    </Routes>
  );
};
