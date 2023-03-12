import { useState } from 'react';

import { DeleteIcon, EditIcon } from '@chakra-ui/icons';
import {
  Card,
  CardBody,
  FormControl,
  Grid,
  GridItem,
  IconButton,
  Input,
  Text,
  useDisclosure,
} from '@chakra-ui/react';

import { Modal } from '@shared/components/Modal/Modal';

import { User } from '../../Home';
import { EditUser } from '../EditUser/EditUser';
import { RemoveUser } from '../RemoveUser/RemoveUser';
import { TabListLoading } from '../TabListLoading';

type TabListProps = {
  users: Array<User>;
  isLoading: boolean;
  onRefetchUsers: () => Promise<void>;
};
export function TabList({ users, isLoading, onRefetchUsers }: TabListProps) {
  if (isLoading) return <TabListLoading />;

  const {
    isOpen: updateUserIsOpen,
    onOpen: updateUserAsOpen,
    onClose: updateUserAsClose,
  } = useDisclosure();
  const {
    isOpen: removeUserIsOpen,
    onOpen: removeUserAsOpen,
    onClose: removeUserAsClose,
  } = useDisclosure();
  const [value, setValue] = useState<string>('');
  const [user, setUser] = useState<User>({ id: '', name: '' });
  const [userId, setUserId] = useState<string>('');

  const filteredUsers = users.filter((user) =>
    user.name.toLowerCase().includes(value.toLowerCase()),
  );

  const onOpenEdit = (userToUpdate: User) => {
    setUser(userToUpdate);
    updateUserAsOpen();
  };
  const onOpenRemove = (id: string) => {
    setUserId(id);
    removeUserAsOpen();
  };

  return (
    <>
      <Grid templateColumns="repeat(1,1fr)" gap={6}>
        <GridItem>
          <FormControl>
            <Input
              value={value}
              type="text"
              placeholder="Insert a name."
              size="lg"
              maxW="500px"
              onChange={({ target }) => setValue(target.value)}
            />
          </FormControl>
        </GridItem>
        <Grid templateColumns="repeat(3, 1fr)" gap={4}>
          {filteredUsers.map((user) => (
            <GridItem key={user.id}>
              <Card bgColor="blue.100">
                <CardBody>
                  <Grid templateColumns="repeat(3,1fr)">
                    <GridItem colSpan={2}>
                      <Text fontSize="sm">ID: {user.id}</Text>
                    </GridItem>
                    <GridItem justifySelf="flex-end">
                      <IconButton
                        borderRadius="full"
                        icon={<EditIcon />}
                        aria-label="Edit icon"
                        onClick={() => onOpenEdit(user)}
                      />
                      <IconButton
                        borderRadius="full"
                        colorScheme="red"
                        icon={<DeleteIcon />}
                        aria-label="Remove icon"
                        mx={2}
                        onClick={() => onOpenRemove(user.id)}
                      />
                    </GridItem>
                  </Grid>
                  <Text fontWeight="bold">Name: {user.name}</Text>
                </CardBody>
              </Card>
            </GridItem>
          ))}
        </Grid>
      </Grid>
      <Modal
        isOpen={updateUserIsOpen}
        onClose={updateUserAsClose}
        title="Atualizar Informações"
      >
        <EditUser
          onClose={updateUserAsClose}
          user={user}
          onRefetchUsers={onRefetchUsers}
        />
      </Modal>
      <Modal
        isOpen={removeUserIsOpen}
        onClose={removeUserAsClose}
        title="Deseja apagar essas informações ?"
      >
        <RemoveUser
          id={userId}
          onClose={removeUserAsClose}
          onRefetchUsers={onRefetchUsers}
        />
      </Modal>
    </>
  );
}
