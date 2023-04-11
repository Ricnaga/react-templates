import {
  render,
  screen,
  userEvent,
  waitForElementToBeRemoved,
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
    const { container } = render(<Home />);
    containerElement = container;
    await waitForElementToBeRemoved(() => screen.getByText(/carregando/i));
  });

  it('render correctly', async () => {
    expect(containerElement).toMatchSnapshot();
  });

  it('change tabs', async () => {
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
