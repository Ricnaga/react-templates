import { renderWithTheme } from '@application/test/testing-library';

import { HomeScreen } from './Home';

describe('Page: HomePage', () => {
  it('should render correctly', () => {
    const { container } = renderWithTheme(<HomeScreen />);
    expect(container).toMatchSnapshot();
  });
});
