import { render } from '@application/test/testing-library';

import { TodoScreen } from './Todo';

describe('Page: HomePage', () => {
  it('should render correctly', () => {
    const { container } = render(<TodoScreen />);
    expect(container).toMatchSnapshot();
  });
});
