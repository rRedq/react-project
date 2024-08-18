import { ControlledPage } from 'pages/ControlledPage/ControlledPage';
import { Main } from 'pages/Main/Main';
import { UncontrolledPage } from 'pages/UncontrolledPage/UncontrolledPage';
import { createBrowserRouter } from 'react-router-dom';
import { Paths } from 'shared/types';
import { CardList } from 'widgets/CardList';

export const router = createBrowserRouter([
  {
    path: Paths.MAIN,
    element: <Main />,
    children: [
      {
        path: Paths.MAIN,
        element: <CardList />,
      },
      {
        path: Paths.UNCONTROLLED,
        element: <UncontrolledPage />,
      },
      {
        path: Paths.CONTROLLED,
        element: <ControlledPage />,
      },
    ],
  },
]);
