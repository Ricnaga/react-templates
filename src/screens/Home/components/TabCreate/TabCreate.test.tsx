import { render, screen, userEvent } from '@application/test/testing-library';

import { TabCreate } from './TabCreate';

let containerElement: HTMLElement;

const callPOST = jest.fn().mockImplementation(() =>
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
      callPOST,
    },
  }),
}));

const handleUpdateUsers = jest
  .fn()
  .mockImplementationOnce(() => Promise.resolve())
  .mockImplementationOnce(() => Promise.reject());

describe('Component: TabCreate', () => {
  beforeEach(() => {
    const { container } = render(
      <TabCreate handleUpdateUsers={handleUpdateUsers} />,
    );
    containerElement = container;
  });

  it('should render correctly', () => {
    expect(containerElement).toMatchSnapshot();
  });

  it('should submit form', async () => {
    await userEvent.click(
      screen.getByRole('button', {
        name: /criar/i,
      }),
    );

    expect(callPOST).toHaveBeenCalled();
    expect(handleUpdateUsers).toHaveBeenCalled();
  });

  it('should test error toast', async () => {
    await userEvent.click(
      screen.getByRole('button', {
        name: /criar/i,
      }),
    );

    expect(callPOST).toHaveBeenCalled();
    expect(handleUpdateUsers).toHaveBeenCalled();
  });
});
