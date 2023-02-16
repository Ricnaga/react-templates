import { ThemeProvider } from '@application/theme/chakra/context';
import {
  render,
  RenderResult,
  screen,
  renderHook,
  fireEvent,
  act,
  waitFor,
} from '@testing-library/react';
import testingUserEvent from '@testing-library/user-event';
import { ReactNode } from 'react';

const renderWithTheme = (children: ReactNode | JSX.Element): RenderResult =>
  render(<ThemeProvider>{children}</ThemeProvider>);

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
