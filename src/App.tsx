import { ChakraUI } from '@application/theme/chakra/context';
import { RouterContext } from './application/routes/context';
import { TopBar } from './shared/components/TopBar/TopBar';

export function App() {
  return (
    <ChakraUI>
      <RouterContext>
        <TopBar />
      </RouterContext>
    </ChakraUI>
  );
}
