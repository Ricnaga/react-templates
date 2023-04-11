import { render, screen, userEvent } from '@application/test/testing-library';
import { User } from '@screens/Home/Home';

import { TabList } from './TabList';

const users: Array<User> = [
  {
    id: 'id1',
    name: 'mock1',
  },
  {
    id: 'id2',
    name: 'mock2',
  },
];

describe('Component: TabList', () => {
  it('should render correctly', async () => {
    render(<TabList isLoading users={users} onRefetchUsers={jest.fn()} />);
    expect(screen.getByText(/carregando/i)).toBeInTheDocument();
  });

  it('should type in an input', async () => {
    render(
      <TabList isLoading={false} users={users} onRefetchUsers={jest.fn()} />,
    );
    const inputValue = 'typing a mock';
    const textElement = screen.getByRole('textbox');

    await userEvent.type(textElement, inputValue);

    expect(textElement).toHaveValue(inputValue);
  });

  it('should render edit modal', async () => {
    render(
      <TabList isLoading={false} users={users} onRefetchUsers={jest.fn()} />,
    );
    const firtIconButton = screen.getAllByRole('button', {
      name: /edit icon/i,
    })[0];

    await userEvent.click(firtIconButton);

    expect(screen.getByRole('banner')).toBeVisible();
  });

  it('should render remove modal', async () => {
    render(
      <TabList isLoading={false} users={users} onRefetchUsers={jest.fn()} />,
    );
    const firtIconButton = screen.getAllByRole('button', {
      name: /remove icon/i,
    })[0];

    await userEvent.click(firtIconButton);

    expect(screen.getByRole('banner')).toBeVisible();
  });
});
