import { ReactNode, useState } from 'react';

import {
  Table as ChakraTable,
  TableCaption,
  TableContainer,
  Tbody,
  Tfoot,
  Th,
  Thead,
  Tr,
} from '@chakra-ui/react';

import { DirectionIconButton } from './DirectionIconButton';

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
      const compareFields = a[fieldName] > b[fieldName];

      if (sortOrder === OrderBy.ASC) return compareFields ? 1 : -1;
      if (sortOrder === OrderBy.DESC) return compareFields ? -1 : 1;
      return 0;
    });
  };

  return (
    <TableContainer>
      <ChakraTable variant="simple">
        <TableCaption>Imperial to metric conversion factors</TableCaption>
        <Thead>
          <Tr>
            {header.map((value) => (
              <Th key={value.header.toString()} colSpan={value.colSpan ?? 1}>
                {value.title}{' '}
                {typeof value.header !== 'function' && (
                  <DirectionIconButton
                    sortField={sortField}
                    fieldName={value.header}
                    order={order}
                    onChangeDirection={() => onOrderBy(value.header as keyof T)}
                  />
                )}
              </Th>
            ))}
          </Tr>
        </Thead>
        <Tbody>
          {data.map((value) => (
            <Tr key={Math.random().toString()}>{children(value)}</Tr>
          ))}
        </Tbody>
        <Tfoot>
          <Tr>
            <Th>To convert</Th>
            <Th>into</Th>
            <Th isNumeric>multiply by</Th>
          </Tr>
        </Tfoot>
      </ChakraTable>
    </TableContainer>
  );
}
