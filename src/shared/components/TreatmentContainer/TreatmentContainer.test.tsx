import { Grid } from '@chakra-ui/react';

import { render } from '@application/test/testing-library';

import { TreatmentContainer } from './TreatmentContainer';

describe('Component: TreatmentContainer', () => {
  it('should render correctly', () => {
    const { container } = render(
      <TreatmentContainer data={{ id: 'mock' }}>
        {({ id }) => <Grid>{id}</Grid>}
      </TreatmentContainer>,
    );

    expect(container).toMatchSnapshot();
  });
});
