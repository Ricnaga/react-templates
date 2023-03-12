import { ReactNode } from 'react';

import {
  act,
  fireEvent,
  render,
  renderHook,
  RenderOptions,
  RenderResult,
  screen,
  waitFor,
} from '@testing-library/react';
import testingUserEvent from '@testing-library/user-event';

import { ThemeProvider } from '@application/theme/chakra/context';

const renderWithTheme = (
  children: ReactNode | JSX.Element,
  options?: RenderOptions,
): RenderResult => render(<ThemeProvider>{children}</ThemeProvider>, options);

const userEvent = testingUserEvent.setup();

export {
  userEvent,
  renderWithTheme,
  screen,
  renderHook,
  fireEvent,
  act,
  waitFor,
};
