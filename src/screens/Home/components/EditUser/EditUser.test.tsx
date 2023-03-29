import {
  renderWithTheme,
  screen,
  userEvent,
  waitFor,
} from '@application/test/testing-library';
import { Modal } from '@shared/components/Modal/Modal';

import { EditUser } from './EditUser';

let containerElement: HTMLElement;

const mockedOnClose = jest.fn().mockReturnValue(true);
const mockedOnRefetchUsers = jest.fn(() => Promise.reject());

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

describe('Component: EditUser', () => {
  beforeEach(() => {
    const { container } = renderWithTheme(
      <Modal isOpen onClose={mockedOnClose}>
        <EditUser
          onClose={jest.fn}
          onRefetchUsers={mockedOnRefetchUsers}
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
  });

  it('should get error toast when submited form', async () => {
    await userEvent.click(
      screen.getByRole('button', {
        name: /atualizar/i,
      }),
    );
  });
});
