import { renderWithTheme } from '@application/test/testing-library';
import { Modal } from '@shared/components/Modal/Modal';

import { RemoveUser } from './RemoveUser';

let containerElement: HTMLElement;

describe('Component: RemoveUser', () => {
  beforeEach(() => {
    const { container } = renderWithTheme(
      <Modal isOpen onClose={jest.fn().mockReturnValue(true)}>
        <RemoveUser onClose={jest.fn} onRefetchUsers={jest.fn()} id="1" />,
      </Modal>,
    );
    containerElement = container;
  });

  it('should render correctly', () => {
    expect(containerElement).toMatchSnapshot();
  });
});
