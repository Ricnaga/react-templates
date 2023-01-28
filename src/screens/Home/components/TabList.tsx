import { DeleteIcon, EditIcon } from '@chakra-ui/icons';
import {
  Button,
  Card,
  CardBody,
  FormControl,
  Grid,
  GridItem,
  IconButton,
  Input,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Text,
  useDisclosure,
} from '@chakra-ui/react';
import { Modal } from '@shared/components/Modal/Modal';
import { useState } from 'react';
import { User } from '../Home';
import { EditUser } from './EditUser';
import { TabListLoading } from './TabListLoading';

type TabListProps = {
  users: Array<User>;
  isLoading: boolean;
  onRefetchUsers: () => Promise<void>;
};
export function TabList({ users, isLoading, onRefetchUsers }: TabListProps) {
  if (isLoading) return <TabListLoading />;

  const { isOpen, onOpen, onClose } = useDisclosure();
  const [value, setValue] = useState<string>('');
  const [user, setUser] = useState<User>({ id: '', name: '' });

  const filteredUsers = users.filter((user) =>
    user.name.toLowerCase().includes(value.toLowerCase()),
  );

  const onOpenEdit = (userToUpdate: User) => {
    setUser(userToUpdate);
    onOpen();
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
      <Modal isOpen={isOpen} onClose={onClose} title="Atualizar Informações">
        <EditUser
          onClose={onClose}
          user={user}
          onRefetchUsers={onRefetchUsers}
        />
      </Modal>
    </>
  );
}
