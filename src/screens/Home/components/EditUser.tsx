import { useAxios } from '@application/api/axios/useAxios';
import {
  ModalBody,
  FormControl,
  Input,
  ModalFooter,
  Button,
} from '@chakra-ui/react';
import { useSnackbar } from '@shared/components/Snackbar/useSnackbar';
import { useFormik } from 'formik';
import { User } from '../Home';

type EditUserProps = {
  onClose: () => void;
  user: User;
  onRefetchUsers: () => Promise<void>;
};

enum FormikValues {
  NAME = 'name',
}

type FormikSubmit = Record<'name', string>;

export function EditUser({ onClose, user, onRefetchUsers }: EditUserProps) {
  const { onSnackBar } = useSnackbar();
  const {
    functions: { callPATCH },
  } = useAxios();
  const formik = useFormik({
    initialValues: {
      [FormikValues.NAME]: user.name,
    },
    onSubmit: async (values: FormikSubmit) =>
      callPATCH<Record<'data', unknown>, { name: string }>({
        url: `/user/${user.id}`,
        bodyData: { name: values.name },
      })
        .then(() => onRefetchUsers())
        .then(() => onSnackBar('This user was updated'))
        .catch(() => onSnackBar('This user was not updated', 'error')),
  });

  return (
    <form onSubmit={formik.handleSubmit}>
      <ModalBody>
        <FormControl>
          <Input
            value={formik.values[FormikValues.NAME]}
            name={FormikValues.NAME}
            placeholder="Update username"
            onChange={formik.handleChange}
          />
        </FormControl>
      </ModalBody>

      <ModalFooter>
        <Button colorScheme="blue" mr={3} type="submit">
          Atualizar
        </Button>
        <Button variant="ghost" onClick={onClose}>
          Fechar
        </Button>
      </ModalFooter>
    </form>
  );
}
