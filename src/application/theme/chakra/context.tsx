import { ReactNode } from 'react';

import { ChakraProvider } from '@chakra-ui/react';

type ChakraUIProps = Partial<Record<'children', ReactNode | JSX.Element>>;

export function ThemeProvider({ children }: ChakraUIProps) {
  return <ChakraProvider resetCSS>{children}</ChakraProvider>;
}
