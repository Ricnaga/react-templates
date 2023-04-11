import { render } from '@application/test/testing-library';

import { TableSortButton } from './TableSortButton';

describe('Component: TableSortButton', () => {
  it('should render correctly', () => {
    const { container } = render(
      <TableSortButton isAscending isSelectedField onChangeDirection={jest.fn}>
        Mock children
      </TableSortButton>,
    );
    expect(container).toMatchSnapshot();
  });

  it('should render ascending button', () => {
    const { container } = render(
      <TableSortButton
        isAscending
        isSelectedField={false}
        onChangeDirection={jest.fn}
      >
        Mock children
      </TableSortButton>,
    );
    expect(container).toMatchSnapshot();
  });

  it('should render descending button', () => {
    const { container } = render(
      <TableSortButton
        isAscending={false}
        isSelectedField={false}
        onChangeDirection={jest.fn}
      >
        Mock children
      </TableSortButton>,
    );
    expect(container).toMatchSnapshot();
  });
});
