import { useState } from 'react';

import {
  AddIcon,
  ArrowLeftIcon,
  ArrowRightIcon,
  CheckIcon,
  DeleteIcon,
  EditIcon,
} from '@chakra-ui/icons';
import {
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Grid,
  GridItem,
  IconButton,
  Input,
  Text,
} from '@chakra-ui/react';

export enum TodoStatus {
  TODO = 1,
  DOING,
  DONE,
}
export type TodoData = Record<'id' | 'description', string> & {
  status: TodoStatus;
};

const titleTodo = {
  [TodoStatus.TODO]: 'To Do',
  [TodoStatus.DOING]: 'Doing',
  [TodoStatus.DONE]: 'Done',
};

const titleColor = {
  [TodoStatus.TODO]: 'red.200',
  [TodoStatus.DOING]: 'yellow.200',
  [TodoStatus.DONE]: 'green.200',
};

export type HandleChangeProps = Record<'id' | 'description', string> & {
  status: TodoStatus;
};

export type HandleMoveProps = { data: TodoData; moveTo: 'NEXT' | 'PREVIOUS' };

type CardTodoProps = {
  title: TodoStatus;
  data: Array<TodoData>;
  handleChange: (args: HandleChangeProps) => void;
  handleRemove: (id: string, status: TodoStatus) => void;
  handleAdd: (args: TodoData) => void;
  handleMove: (args: HandleMoveProps) => void;
};

export function CardTodo({
  title,
  data,
  handleChange,
  handleRemove,
  handleAdd,
  handleMove,
}: CardTodoProps) {
  const [rowId, setRowId] = useState<Array<string>>([]);

  const onChangeRow = (id: string) => {
    const hasId = rowId.includes(id);

    setRowId((state) =>
      !hasId ? [...state, id] : state.filter((stateId) => stateId !== id),
    );
  };

  const onAddTodo = () => {
    const newTodo: TodoData = {
      id: Math.random().toString(),
      status: title,
      description: '',
    };

    handleAdd(newTodo);

    onChangeRow(newTodo.id);
  };

  return (
    <Card>
      <CardHeader bgColor={titleColor[title]} borderTopRadius={8}>
        <Text fontSize="3xl" textAlign="center">
          {titleTodo[title]}
        </Text>
      </CardHeader>
      <CardBody>
        {data.map((todo) => (
          <Grid key={todo.id} templateColumns="repeat(6, 1fr)" mb={2}>
            {todo.status > 1 && (
              <GridItem>
                <IconButton
                  borderRadius="full"
                  icon={<ArrowLeftIcon />}
                  aria-label="Previous task"
                  onClick={() => handleMove({ data: todo, moveTo: 'PREVIOUS' })}
                />
              </GridItem>
            )}

            <GridItem colSpan={todo.status === 2 ? 3 : 4}>
              {rowId.includes(todo.id) ? (
                <Input
                  placeholder="Insert a description"
                  value={todo.description}
                  onChange={({ target }) =>
                    handleChange({
                      id: todo.id,
                      description: target.value,
                      status: title,
                    })
                  }
                />
              ) : (
                <Text textAlign="center" fontSize="lg">
                  {todo.description}
                </Text>
              )}
            </GridItem>

            {todo.status < 3 && (
              <GridItem colSpan={2} justifySelf="flex-end">
                <IconButton
                  borderRadius="full"
                  icon={rowId.includes(todo.id) ? <CheckIcon /> : <EditIcon />}
                  onClick={() => onChangeRow(todo.id)}
                  aria-label="Edit icon"
                />
                <IconButton
                  borderRadius="full"
                  colorScheme="red"
                  icon={<DeleteIcon />}
                  aria-label="Remove icon"
                  mx={2}
                  onClick={() => handleRemove(todo.id, title)}
                />
                <IconButton
                  borderRadius="full"
                  icon={<ArrowRightIcon />}
                  aria-label="Next Task"
                  onClick={() => handleMove({ data: todo, moveTo: 'NEXT' })}
                />
              </GridItem>
            )}
          </Grid>
        ))}
      </CardBody>
      {title !== TodoStatus.DONE && (
        <CardFooter>
          <IconButton
            icon={<AddIcon />}
            aria-label="Add icon"
            w="100%"
            onClick={onAddTodo}
          />
        </CardFooter>
      )}
    </Card>
  );
}
