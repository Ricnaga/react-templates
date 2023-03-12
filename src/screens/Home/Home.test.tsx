import {
  renderWithTheme,
  screen,
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

describe('Page: Home', () => {
  it('render correctly', async () => {
    const { container } = renderWithTheme(<Home />);

    await waitForElementToBeRemoved(() => screen.getByText(/carregando/i));

    expect(container).toMatchSnapshot();
  });
});
