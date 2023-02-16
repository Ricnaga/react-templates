import { ThemeProvider } from '@application/theme/chakra/context';
import { Grid } from '@chakra-ui/react';
import { RouterContext } from './application/routes/context';
import { TopBar } from './shared/components/TopBar/TopBar';

export function App() {
  return (
    <ThemeProvider>
      <Grid paddingX={4}>
        <RouterContext>
          <TopBar />
        </RouterContext>
      </Grid>
    </ThemeProvider>
  );
}
