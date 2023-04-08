import { ReactNode } from 'react';

import { Grid } from '@chakra-ui/react';
import { createBrowserRouter, Outlet } from 'react-router-dom';

import { Home, TableSampleScreen, TodoScreen } from '@screens';
import { TopBar } from '@shared/components/TopBar/TopBar';

import { HOME, TABLE_SAMPLE, TODO } from './paths';

function Container() {
  return (
    <Grid paddingX={4}>
      <TopBar />
      <Outlet />
    </Grid>
  );
}

export const router = createBrowserRouter([
  {
    path: HOME,
    element: <Container />,
    children: [
      {
        path: HOME,
        element: <Home />,
      },
      {
        path: TODO,
        element: <TodoScreen />,
      },
      {
        path: TABLE_SAMPLE,
        element: <TableSampleScreen />,
      },
    ],
  },
]);
