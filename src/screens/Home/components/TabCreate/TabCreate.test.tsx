import { render } from '@application/test/testing-library';

import { TabCreate } from './TabCreate';

let containerElement: HTMLElement;

describe('Component: TabCreate', () => {
  beforeEach(async () => {
    const { container } = render(<TabCreate handleUpdateUsers={jest.fn} />);

    containerElement = container;
  });

  it('should render correctly', () => {
    expect(containerElement).toMatchSnapshot();
  });
});
