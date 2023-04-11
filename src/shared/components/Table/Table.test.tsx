import { Td } from '@chakra-ui/react';

import { render, userEvent, within } from '@application/test/testing-library';

import { Table, TableHeaderKeys } from './Table';

const header: TableHeaderKeys<{ id: string }> = [
  { header: 'id', title: 'Mock id' },
];

const data: Array<{ id: string }> = [
  { id: 'id1' },
  { id: 'id1' },
  { id: 'id2' },
];

describe('Component: Table', () => {
  it('should render correctly', () => {
    const { container } = render(
      <Table header={header} data={data}>
        {({ id }) => <Td>{id}</Td>}
      </Table>,
    );
    expect(container).toMatchSnapshot();
  });

  it('should order column', async () => {
    const { getByRole } = render(
      <Table header={header} data={data}>
        {({ id }) => <Td>{id}</Td>}
      </Table>,
    );
    const columnheader = getByRole('columnheader', {
      name: /mock id/i,
    });
    const columnButton = within(columnheader).getByRole('button', {
      name: /order icon/i,
    });

    await userEvent.click(columnButton);
    await userEvent.click(columnButton);
    await userEvent.click(columnButton);
    await userEvent.click(columnButton);
    expect(data[0].id).toBe('id2');
  });
});
