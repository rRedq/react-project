import { CardDetails } from 'features/CardDetails';
import { Main } from 'pages/Main/Main';
import { NotFound } from 'pages/NotFound/NotFound';
import { ReactNode } from 'react';
import { Paths } from 'shared/types';

export interface Router {
  path: Paths;
  element: ReactNode;
  children?: Omit<Router, 'children'>[];
}

export const rootRouter: Router[] = [
  {
    path: Paths.MAIN,
    element: <Main />,
    children: [{ path: Paths.MAIN, element: <CardDetails /> }],
  },
  {
    path: Paths.NOT_FOUND,
    element: <NotFound />,
  },
];
