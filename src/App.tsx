import { ThemeProvider } from '@application/theme/chakra/context';

import { RouterContext } from './application/routes/context';

export function App() {
  return (
    <ThemeProvider>
      <RouterContext />
    </ThemeProvider>
  );
}
