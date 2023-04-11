import { Td } from '@chakra-ui/react';

import {
  render,
  screen,
  userEvent,
  within,
} from '@application/test/testing-library';

import { Table, TableHeaderKeys } from './Table';

type MockData = { id: string };

const header: TableHeaderKeys<MockData> = [{ header: 'id', title: 'Mock id' }];

const data: Array<MockData> = [{ id: 'id1' }, { id: 'id1' }, { id: 'id2' }];

let containerElement: HTMLElement;

describe('Component: Table', () => {
  beforeEach(() => {
    const { container } = render(
      <Table header={header} data={data}>
        {({ id }) => <Td>{id}</Td>}
      </Table>,
    );

    containerElement = container;
  });

  it('should render correctly', () => {
    expect(containerElement).toMatchSnapshot();
  });

  it('should order column', async () => {
    const columnheader = screen.getByRole('columnheader', {
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
