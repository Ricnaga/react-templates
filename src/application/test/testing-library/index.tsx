import { ReactNode } from 'react';

import {
  act,
  fireEvent,
  render,
  renderHook,
  screen,
  waitFor,
  waitForElementToBeRemoved,
} from '@testing-library/react';
import type { RenderOptions, RenderResult } from '@testing-library/react';
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
  waitForElementToBeRemoved,
};
