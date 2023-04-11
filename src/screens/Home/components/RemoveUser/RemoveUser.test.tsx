import { render, screen, userEvent } from '@application/test/testing-library';
import { Modal } from '@shared/components/Modal/Modal';

import { RemoveUser } from './RemoveUser';

let containerElement: HTMLElement;

const callDELETE = jest.fn().mockImplementation(() =>
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
      callDELETE,
    },
  }),
}));

const onRefetchUsers = jest
  .fn()
  .mockImplementationOnce(() => Promise.resolve())
  .mockImplementationOnce(() => Promise.reject());

describe('Component: RemoveUser', () => {
  beforeEach(() => {
    const { container } = render(
      <Modal isOpen onClose={jest.fn().mockReturnValue(true)}>
        <RemoveUser
          onClose={jest.fn}
          onRefetchUsers={onRefetchUsers}
          id="id1"
        />
        ,
      </Modal>,
    );
    containerElement = container;
  });

  it('should render correctly', () => {
    expect(containerElement).toMatchSnapshot();
  });

  it('should submit form', async () => {
    await userEvent.click(
      screen.getByRole('button', {
        name: /remover/i,
      }),
    );

    expect(callDELETE).toHaveBeenCalled();
    expect(onRefetchUsers).toHaveBeenCalled();
  });

  it('should test error toast', async () => {
    await userEvent.click(
      screen.getByRole('button', {
        name: /remover/i,
      }),
    );

    expect(callDELETE).toHaveBeenCalled();
    expect(onRefetchUsers).toHaveBeenCalled();
  });
});
