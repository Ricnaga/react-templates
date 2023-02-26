import { renderWithTheme } from '@application/test/testing-library';

import { TodoScreen } from './Todo';

describe('Page: HomePage', () => {
  it('should render correctly', () => {
    const { container } = renderWithTheme(<TodoScreen />);
    expect(container).toMatchSnapshot();
  });
});
