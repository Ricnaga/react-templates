import { Button, ModalFooter } from '@chakra-ui/react';

import { useAxios } from '@application/api/axios/useAxios';
import { useSnackbar } from '@shared/components/Snackbar/useSnackbar';

type RemoveUserUserProps = {
  onClose: () => void;
  id: string;
  onRefetchUsers: () => Promise<void>;
};

export function RemoveUser({
  onClose,
  id,
  onRefetchUsers,
}: RemoveUserUserProps) {
  const { onSnackBar } = useSnackbar();
  const {
    functions: { callDELETE },
  } = useAxios();

  const onDelete = async () =>
    callDELETE<Record<'data', unknown>>({
      url: `/user/${id}`,
    })
      .then(() => onRefetchUsers())
      .then(() => onSnackBar('This user was deleted'))
      .catch(() => onSnackBar('This user was not deleted', 'error'));

  return (
    <ModalFooter>
      <Button colorScheme="blue" mr={3} type="submit" onClick={onDelete}>
        Remover
      </Button>
      <Button variant="ghost" onClick={onClose}>
        Fechar
      </Button>
    </ModalFooter>
  );
}
