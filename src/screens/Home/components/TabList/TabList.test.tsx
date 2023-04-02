import { act, render, waitFor } from '@application/test/testing-library';

import { TabList } from './TabList';

let containerElement: HTMLElement;

describe('Component: TabList', () => {
  beforeEach(async () => {
    const { container } = await act(() =>
      render(
        <TabList
          isLoading={false}
          onRefetchUsers={jest.fn()}
          users={[{ id: '1', name: 'mock name' }]}
        />,
      ),
    );
    containerElement = container;
  });

  it('should render correctly', async () => {
    await waitFor(() => expect(containerElement).toMatchSnapshot());
  });
});
