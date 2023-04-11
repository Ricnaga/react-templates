import { useToast } from '@chakra-ui/react';

type ToastColor = 'info' | 'warning' | 'success' | 'error' | 'loading';

export const useSnackbar = () => {
  const toast = useToast();
  const onSnackBar = (description: string, status: ToastColor = 'success') =>
    toast({
      status,
      get title() {
        return status.toUpperCase();
      },
      description,
      isClosable: true,
      position: 'bottom-left',
    });

  return {
    onSnackBar,
  };
};
