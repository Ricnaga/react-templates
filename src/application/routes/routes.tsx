import { TodoScreen } from '@screens/Todo';
import { Route, Routes } from 'react-router-dom';
import { HomeScreen } from '../../screens/Home';
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
