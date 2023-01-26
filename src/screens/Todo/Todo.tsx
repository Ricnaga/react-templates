import { Grid, GridItem } from '@chakra-ui/react';
import { useState } from 'react';
import {
  CardTodo,
  HandleChangeProps,
  HandleMoveProps,
  TodoData,
  TodoStatus,
} from './components/CardTodo';

const MOCK_DATA: Array<TodoData> = [
  { id: Math.random().toString(), status: 1, description: 'Pegar casaco' },
  { id: Math.random().toString(), status: 2, description: 'Pegar calça' },
  { id: Math.random().toString(), status: 3, description: 'Pegar sapato' },
  { id: Math.random().toString(), status: 1, description: 'Pegar blusa' },
  { id: Math.random().toString(), status: 2, description: 'Pegar bolsa' },
];

const filterByStatus = (status: TodoStatus) =>
  MOCK_DATA.filter((data) => data.status === status);

export function TodoScreen() {
  const [todo, setTodo] = useState<Array<TodoData>>(
    filterByStatus(TodoStatus.TODO),
  );
  const [doing, setDoing] = useState<Array<TodoData>>(
    filterByStatus(TodoStatus.DOING),
  );
  const [done, setDone] = useState<Array<TodoData>>(
    filterByStatus(TodoStatus.DONE),
  );

  const mapById = (id: string, description: string, data: Array<TodoData>) =>
    data.map((newState) =>
      newState.id === id ? { ...newState, description } : newState,
    );

  const handleChangeStatus = ({
    id,
    description,
    status,
  }: HandleChangeProps) => {
    if (status === TodoStatus.DOING) {
      setDoing((state) => mapById(id, description, state));
      return;
    }

    setTodo((state) => mapById(id, description, state));
  };

  const filterById = (id: string, data: Array<TodoData>) =>
    data.filter((newState) => newState.id !== id);

  const handleRemoveTodo = (id: string, status: TodoStatus) => {
    if (status === TodoStatus.DOING) {
      setDoing((state) => filterById(id, state));
      return;
    }

    setTodo((state) => filterById(id, state));
  };

  const handleAddTodo = (data: TodoData) => {
    if (data.status === TodoStatus.DOING) {
      setDoing([...doing, data]);
      return;
    }

    setTodo([...todo, data]);
  };

  const handleMoveTodo = ({ data, moveTo }: HandleMoveProps) => {
    switch (data.status) {
      case TodoStatus.DOING: {
        setDoing((state) => filterById(data.id, state));

        if (moveTo === 'NEXT') {
          setDone((state) => [...state, { ...data, status: TodoStatus.DONE }]);
          return;
        }

        setTodo((state) => [...state, { ...data, status: TodoStatus.TODO }]);
        return;
      }
      case TodoStatus.DONE: {
        setDone((state) => filterById(data.id, state));

        setDoing((state) => [...state, { ...data, status: TodoStatus.DOING }]);
        return;
      }
      default: {
        setTodo((state) => filterById(data.id, state));
        setDoing((state) => [...state, { ...data, status: TodoStatus.DOING }]);
      }
    }
  };

  return (
    <Grid paddingX={4} gap={4} templateColumns="repeat(3,1fr)">
      <GridItem>
        <CardTodo
          title={TodoStatus.TODO}
          data={todo}
          handleChange={handleChangeStatus}
          handleRemove={handleRemoveTodo}
          handleAdd={handleAddTodo}
          handleMove={handleMoveTodo}
        />
      </GridItem>
      <GridItem>
        <CardTodo
          title={TodoStatus.DOING}
          data={doing}
          handleChange={handleChangeStatus}
          handleRemove={handleRemoveTodo}
          handleAdd={handleAddTodo}
          handleMove={handleMoveTodo}
        />
      </GridItem>
      <GridItem>
        <CardTodo
          title={TodoStatus.DONE}
          data={done}
          handleChange={handleChangeStatus}
          handleRemove={handleRemoveTodo}
          handleAdd={handleAddTodo}
          handleMove={handleMoveTodo}
        />
      </GridItem>
    </Grid>
  );
}
