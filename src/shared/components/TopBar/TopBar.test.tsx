import { render } from '@application/test/testing-library';

import { TopBar } from './TopBar';

describe('Component: TopBar', () => {
  it('should render correctly', () => {
    const { container } = render(<TopBar />);
    expect(container).toMatchSnapshot();
  });
});
