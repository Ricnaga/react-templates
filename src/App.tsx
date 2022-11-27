import { RouterContext } from './application/routes/context';
import { TopBar } from './shared/components/TopBar/TopBar';

export function App() {
  return (
    <RouterContext>
      <TopBar />
    </RouterContext>
  );
}
