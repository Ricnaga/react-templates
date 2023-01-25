import { TODO, HOME } from '../../../application/routes/paths';

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
    <div>
      <nav>
        {links.map(({ href, children }) => (
          <a key={children} href={href}>
            {children}
          </a>
        ))}
      </nav>
    </div>
  );
}
