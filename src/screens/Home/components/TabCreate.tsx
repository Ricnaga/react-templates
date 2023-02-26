import { Button, FormControl, FormLabel, Grid, Input } from '@chakra-ui/react';
import { useFormik } from 'formik';

import { useAxios } from '@application/api/axios/useAxios';
import { useSnackbar } from '@shared/components/Snackbar/useSnackbar';

enum FormikValues {
  NAME = 'name',
}

type FormikSubmit = Record<'name', string>;

type TabCreateProps = {
  handleUpdateUsers: () => void;
};

export function TabCreate({ handleUpdateUsers }: TabCreateProps) {
  const { onSnackBar } = useSnackbar();
  const {
    functions: { callPOST },
  } = useAxios();

  const formik = useFormik({
    initialValues: {
      [FormikValues.NAME]: '',
    },
    onSubmit: async (values: FormikSubmit) =>
      callPOST({
        url: '/user',
        bodyData: {
          id: Math.random().toString(),
          name: values.name,
        },
      })
        .then(() => handleUpdateUsers())
        .then(() => onSnackBar('This user was created'))
        .catch(() => onSnackBar('This user was not created', 'error')),
  });

  return (
    <form onSubmit={formik.handleSubmit}>
      <Grid gap={6} maxW="800px" m="auto" mt={10}>
        <FormControl>
          <FormLabel>Name</FormLabel>
          <Input
            type="text"
            placeholder="Insert a name."
            size="lg"
            name={FormikValues.NAME}
            onChange={formik.handleChange}
          />
        </FormControl>

        <Button colorScheme="telegram" type="submit">
          Criar
        </Button>
      </Grid>
    </form>
  );
}
