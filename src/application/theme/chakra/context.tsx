import { ChakraProvider } from '@chakra-ui/react';
import { ReactNode } from 'react';

type ChakraUIProps = Partial<Record<'children', ReactNode | JSX.Element>>;

export function ChakraUI({ children }: ChakraUIProps) {
  return <ChakraProvider resetCSS>{children}</ChakraProvider>;
}
