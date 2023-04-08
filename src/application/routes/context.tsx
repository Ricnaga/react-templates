import { RouterProvider } from 'react-router-dom';

import { router } from './routes';

export function RouterContext() {
  return <RouterProvider router={router} />;
}
