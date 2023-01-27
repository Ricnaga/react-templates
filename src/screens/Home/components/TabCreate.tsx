import { useAxios } from '@application/api/axios/useAxios';
import {
  Button,
  FormControl,
  FormLabel,
  Grid,
  Input,
  useToast,
} from '@chakra-ui/react';
import { useFormik } from 'formik';

enum FormikValues {
  NAME = 'name',
}

type FormikSubmit = Record<'name', string>;

export function TabCreate() {
  const toast = useToast();
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
        .then(() =>
          toast({
            status: 'success',
            title: 'Success',
            description: 'This user was created',
            isClosable: true,
            position: 'bottom-left',
          }),
        )
        .catch(() =>
          toast({
            status: 'error',
            title: 'Error',
            description: 'This user was not created',
            isClosable: true,
            position: 'bottom-left',
          }),
        ),
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