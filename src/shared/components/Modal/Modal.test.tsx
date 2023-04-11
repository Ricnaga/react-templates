import { render } from '@application/test/testing-library';

import { Modal } from './Modal';

describe('Component: Modal', () => {
  it('should render correctly', () => {
    const { container } = render(
      <Modal isOpen onClose={jest.fn(() => false)} title="mock title">
        Modal
      </Modal>,
    );

    expect(container).toMatchSnapshot();
  });
});
