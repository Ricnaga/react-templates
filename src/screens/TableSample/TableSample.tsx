import { ChangeEvent, useState } from 'react';

import { Checkbox, Td } from '@chakra-ui/react';

import { Table, TableHeaderKeys } from '@shared/components/Table/Table';

type DataTable = Record<'id' | 'name' | 'age', string>;

const data: Array<DataTable> = [
  { id: '1', name: 'Nome1', age: '10' },
  { id: '2', name: 'Nome2', age: '30' },
  { id: '3', name: 'Nome3', age: '20' },
  { id: '4', name: 'Nome4', age: '40' },
];

export function TableSampleScreen() {
  const [allIsChecked, setAllAsChecked] = useState<Array<string>>([]);

  const onIsAllChecked = (event: ChangeEvent<HTMLInputElement>) =>
    setAllAsChecked(() =>
      event.target.checked ? data.map((value) => value.id) : [],
    );
  const onIsChecked = (event: ChangeEvent<HTMLInputElement>, id: string) =>
    setAllAsChecked((state) =>
      event.target.checked
        ? [...state, id]
        : state.filter((value) => value !== id),
    );

  const header: TableHeaderKeys<DataTable, 'isActive'> = [
    {
      header: 'id',
      title: (
        <Checkbox
          isChecked={!!allIsChecked.length}
          onChange={(event) => onIsAllChecked(event)}
        />
      ),
    },
    { header: 'name', title: 'Nome' },
    { header: 'age', title: 'Idade' },
  ];

  return (
    <Table header={header} data={data}>
      {(value) => (
        <>
          <Td>
            <Checkbox
              isChecked={allIsChecked.includes(value.id)}
              onChange={(event) => onIsChecked(event, value.id)}
            />
          </Td>
          <Td>{value.name}</Td>
          <Td>{value.age}</Td>
        </>
      )}
    </Table>
  );
}
