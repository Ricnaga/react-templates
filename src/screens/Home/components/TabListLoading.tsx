import {
  Card,
  CardBody,
  Grid,
  GridItem,
  Skeleton,
  Text,
} from '@chakra-ui/react';

export function TabListLoading() {
  return (
    <Grid templateColumns="repeat(1,1fr)" gap={6}>
      <GridItem>
        <Skeleton h="40px" />
      </GridItem>
      <Grid templateColumns="repeat(3, 1fr)" gap={4}>
        {Array.from({ length: 6 }).map(() => (
          <GridItem key={Math.random().toString()}>
            <Card>
              <CardBody>
                <Skeleton h="30px" mb={1} />
                <Skeleton h="30px" />
              </CardBody>
            </Card>
          </GridItem>
        ))}
      </Grid>
    </Grid>
  );
}
