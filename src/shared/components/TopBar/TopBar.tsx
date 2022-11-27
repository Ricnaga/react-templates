import { HOME } from '../../../application/routes/paths';

const links = [
  {
    href: HOME,
    children: 'Home',
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
      <div>
        <h1>oi</h1>
      </div>
    </div>
  );
}
