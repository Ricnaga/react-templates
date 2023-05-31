import { ReactElement } from 'react';

import { Grid, Skeleton, Stack, Text } from '@chakra-ui/react';

import { RequestStatus } from '@application/api/axios/useAxios';

interface TreatmentContainerProps<T> {
  data: T | undefined;
  isEmpty?: boolean;
  status?: keyof typeof RequestStatus;
  loadingCard?: ReactElement;
  emptyCard?: ReactElement;
  children: (data: T) => ReactElement;
}

export function TreatmentContainer<T>({
  data,
  status,
  isEmpty = false,
  children,
  emptyCard,
  loadingCard,
}: TreatmentContainerProps<T>) {
  switch (status) {
    case RequestStatus.FAIL:
      return (
        <Text fontSize="xl" textAlign="center">
          Erro! Não foi possível receber dados do backend
        </Text>
      );

    case RequestStatus.PENDING: {
      return (
        loadingCard || (
          <Stack>
            {Array.from({ length: 3 }).map(() => (
              <Skeleton key={Math.random()} height="1.5rem" />
            ))}
          </Stack>
        )
      );
    }

    default: {
      if (isEmpty) return emptyCard || <Grid>IS EMPTY</Grid>;

      return <Grid>{data && children(data)}</Grid>;
    }
  }
}
