import { ReactNode } from 'react';

import type { RenderOptions, RenderResult } from '@testing-library/react';
import { render } from '@testing-library/react';
import testingUserEvent from '@testing-library/user-event';

import { ThemeProvider } from '@application/theme/chakra/context';

const renderWithTheme = (
  children: ReactNode | JSX.Element,
  options?: RenderOptions,
): RenderResult => render(<ThemeProvider>{children}</ThemeProvider>, options);

const userEvent = testingUserEvent.setup();

export * from '@testing-library/react';
export { userEvent, renderWithTheme as render };
