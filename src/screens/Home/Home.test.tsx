import {
  act,
  renderWithTheme,
  screen,
  userEvent,
  waitFor,
} from '@application/test/testing-library';

import { Home } from './Home';

const callGET = jest.fn().mockImplementation(() =>
  Promise.resolve({
    data: [
      {
        id: '1',
        name: 'mock Name',
      },
    ],
  }),
);

jest.mock('@application/api/axios/useAxios', () => ({
  __esModule: true,
  useAxios: () => ({
    functions: {
      callGET,
    },
  }),
}));

let containerElement: HTMLElement;

describe('Page: Home', () => {
  beforeEach(async () => {
    const { container } = await act(() => renderWithTheme(<Home />));
    containerElement = container;
  });

  it('should render correctly', async () => {
    await waitFor(() => expect(containerElement).toMatchSnapshot());
  });

  it('should change tabs', async () => {
    await userEvent.click(
      screen.getByRole('tab', {
        name: /create/i,
      }),
    );

    expect(
      screen.getByRole('textbox', {
        name: /name/i,
      }),
    ).toBeInTheDocument();
  });
});
