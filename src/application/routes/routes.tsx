import { HomeScreen, TodoScreen } from '@screens';
import { Route, Routes } from 'react-router-dom';
import { HOME, TODO } from './paths';

const routes = [
  {
    path: `${HOME}*`,
    element: <HomeScreen />,
  },
  {
    path: `${TODO}/*`,
    element: <TodoScreen />,
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
