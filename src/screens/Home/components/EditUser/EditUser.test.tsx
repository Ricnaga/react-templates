import { render, screen, userEvent } from '@application/test/testing-library';
import { Modal } from '@shared/components/Modal/Modal';

import { EditUser } from './EditUser';

let containerElement: HTMLElement;

const callPATCH = jest.fn().mockImplementation(() =>
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
      callPATCH,
    },
  }),
}));

const onRefetchUsers = jest
  .fn()
  .mockImplementationOnce(() => Promise.resolve())
  .mockImplementationOnce(() => Promise.reject());

describe('Component: EditUser', () => {
  beforeEach(() => {
    const { container } = render(
      <Modal isOpen onClose={jest.fn().mockReturnValue(true)}>
        <EditUser
          onClose={jest.fn}
          onRefetchUsers={onRefetchUsers}
          user={{ id: '1', name: 'mock name' }}
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
        name: /atualizar/i,
      }),
    );

    expect(callPATCH).toHaveBeenCalled();
    expect(onRefetchUsers).toHaveBeenCalled();
  });

  it('should test error toast', async () => {
    await userEvent.click(
      screen.getByRole('button', {
        name: /atualizar/i,
      }),
    );

    expect(callPATCH).toHaveBeenCalled();
    expect(onRefetchUsers).toHaveBeenCalled();
  });
});
