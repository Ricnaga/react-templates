import { renderWithTheme } from '@application/test/testing-library';
import { Modal } from '@shared/components/Modal/Modal';

import { EditUser } from './EditUser';

let containerElement: HTMLElement;

describe('Component: EditUser', () => {
  beforeEach(() => {
    const { container } = renderWithTheme(
      <Modal isOpen onClose={jest.fn().mockReturnValue(true)}>
        <EditUser
          onClose={jest.fn}
          onRefetchUsers={jest.fn()}
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
});
