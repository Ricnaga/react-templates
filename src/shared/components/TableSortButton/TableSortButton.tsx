import { ReactNode, useMemo } from 'react';

import { TriangleDownIcon, TriangleUpIcon, UpDownIcon } from '@chakra-ui/icons';
import { Button } from '@chakra-ui/react';

interface TableSortButtonProps {
  onChangeDirection: () => void;
  isSelectedField: boolean;
  isAscending: boolean;
  children: ReactNode;
}

export function TableSortButton({
  onChangeDirection,
  isSelectedField,
  isAscending,
  children,
}: TableSortButtonProps) {
  const icon = useMemo(() => {
    if (isSelectedField) return <UpDownIcon />;
    return isAscending ? <TriangleUpIcon /> : <TriangleDownIcon />;
  }, [isAscending, isSelectedField]);

  return (
    <Button
      aria-label="Order Icon"
      rightIcon={icon}
      variant="link"
      size="sm"
      onClick={onChangeDirection}
    >
      {children}
    </Button>
  );
}
