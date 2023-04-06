import { Route, Routes } from 'react-router-dom';

import { Home, TableSampleScreen, TodoScreen } from '@screens';

import { HOME, TABLE_SAMPLE, TODO } from './paths';

const routes = [
  {
    path: `${HOME}*`,
    element: <Home />,
  },
  {
    path: `${TODO}/*`,
    element: <TodoScreen />,
  },
  {
    path: `${TABLE_SAMPLE}/*`,
    element: <TableSampleScreen />,
  },
];

export function RoutesPages() {
  return (
    <Routes>
      {routes.map((route) => (
        <Route key={route.path} path={route.path} element={route.element} />
      ))}
    </Routes>
  );
}
