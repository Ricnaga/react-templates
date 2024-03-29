import { ReactNode, useState } from 'react';

import {
  Table as ChakraTable,
  TableCaption,
  TableContainer,
  Tbody,
  Th,
  Thead,
  Tr,
} from '@chakra-ui/react';

import { TableSortButton } from '../TableSortButton/TableSortButton';

type Data = Record<symbol, symbol>;

export type TableHeaderKeys<T extends Data, Extra extends string = ''> = Array<{
  header: keyof T | Extra;
  title: string | ReactNode;
  colSpan?: number;
}>;

interface TableProps<T extends Data, Extra extends string = ''> {
  header: TableHeaderKeys<T, Extra>;
  data: Array<T>;
  children: (data: T) => ReactNode;
}

enum OrderBy {
  ASC = 'ASC',
  DESC = 'DESC',
}

export function Table<T extends Data, Extra extends string = ''>({
  data,
  header,
  children,
}: TableProps<T, Extra>) {
  const [sortField, setSortField] = useState<keyof T>();
  const [order, setOrder] = useState<keyof typeof OrderBy>('ASC');

  const onOrderBy = (fieldName: keyof T) => {
    const sortOrder =
      fieldName === sortField && order === 'ASC' ? OrderBy.DESC : OrderBy.ASC;

    setSortField(fieldName);
    setOrder(sortOrder);

    data.sort((a, b) => {
      const nextGreatherThenPrevious = a[fieldName] > b[fieldName];

      if (sortOrder === OrderBy.DESC && nextGreatherThenPrevious) return -1;
      if (sortOrder === OrderBy.ASC && !nextGreatherThenPrevious) return -1;
      if (sortOrder === OrderBy.ASC && nextGreatherThenPrevious) return 1;

      return 0;
    });
  };

  return (
    <TableContainer>
      <ChakraTable variant="simple">
        <Thead>
          <Tr>
            {header.map((value) => (
              <Th key={value.header.toString()} colSpan={value.colSpan}>
                <TableSortButton
                  isSelectedField={sortField !== value.header}
                  isAscending={order === 'ASC'}
                  onChangeDirection={() => onOrderBy(value.header as keyof T)}
                >
                  {value.title}
                </TableSortButton>
              </Th>
            ))}
          </Tr>
        </Thead>
        <Tbody>
          {data.map((value) => (
            <Tr key={Math.random().toString()}>{children(value)}</Tr>
          ))}
        </Tbody>
        <TableCaption>Exemplo de tabela ordenada</TableCaption>
      </ChakraTable>
    </TableContainer>
  );
}
