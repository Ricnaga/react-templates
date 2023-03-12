import { renderWithTheme } from '@application/test/testing-library';

import { TopBar } from './TopBar';

let containerElement: HTMLElement;

describe('Component: TopBar', () => {
  beforeEach(() => {
    const { container } = renderWithTheme(<TopBar />);
    containerElement = container;
  });

  it('should render correctly', () => {
    expect(containerElement).toMatchSnapshot();
  });
});
