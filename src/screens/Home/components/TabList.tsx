import {
  Card,
  CardBody,
  FormControl,
  Grid,
  GridItem,
  Input,
  Text,
} from '@chakra-ui/react';
import { useState } from 'react';
import { User } from '../Home';

type TabListProps = {
  users: Array<User>;
};
export function TabList({ users }: TabListProps) {
  const [value, setValue] = useState<string>('');

  const filteredUsers = users.filter((user) =>
    user.name.toLowerCase().includes(value.toLowerCase()),
  );

  return (
    <Grid templateColumns="repeat(1,1fr)" gap={6}>
      <GridItem>
        <FormControl>
          <Input
            value={value}
            type="text"
            placeholder="Insert a name."
            size="lg"
            onChange={({ target }) => setValue(target.value)}
          />
        </FormControl>
      </GridItem>
      <Grid templateColumns="repeat(3, 1fr)" gap={4}>
        {filteredUsers.map((user) => (
          <GridItem key={user.id}>
            <Card bgColor="blue.100">
              <CardBody>
                <Text fontSize="sm">ID: {user.id}</Text>
                <Text fontWeight="bold">Name: {user.name}</Text>
              </CardBody>
            </Card>
          </GridItem>
        ))}
      </Grid>
    </Grid>
  );
}
