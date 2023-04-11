import { act, renderHook } from '@application/test/testing-library';
import { ThemeProvider } from '@application/theme/chakra/context';

import { useSnackbar } from './useSnackbar';

type IHook = Record<'current', ReturnType<typeof useSnackbar>>;

let resultHook: IHook;

describe('Component: Snackbar', () => {
  beforeEach(() => {
    const { result } = renderHook(() => useSnackbar(), {
      wrapper: ThemeProvider,
    });
    resultHook = result;
  });

  it('should render correctly', () => {
    act(() => resultHook.current.onSnackBar('mock'));
    expect(resultHook).toMatchSnapshot();
  });
});
