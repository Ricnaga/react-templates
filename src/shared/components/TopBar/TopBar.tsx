import { Grid, Link } from '@chakra-ui/react';

import { HOME, TODO } from '../../../application/routes/paths';

const links = [
  {
    href: HOME,
    children: 'Home',
  },
  {
    href: TODO,
    children: 'TODO',
  },
];

export function TopBar() {
  return (
    <Grid my={4}>
      <nav>
        {links.map(({ href, children }) => (
          <Link key={children} href={href} mr={2} fontSize="lg">
            {children}
          </Link>
        ))}
      </nav>
    </Grid>
  );
}
