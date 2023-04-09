import { useMemo } from 'react';

import { TriangleDownIcon, TriangleUpIcon, UpDownIcon } from '@chakra-ui/icons';
import { IconButton } from '@chakra-ui/react';

interface DirectionIconButtonProps {
  onChangeDirection: () => void;
  isSelectedField: boolean;
  isAscending: boolean;
}

export function DirectionIconButton({
  onChangeDirection,
  isSelectedField,
  isAscending,
}: DirectionIconButtonProps) {
  const icon = useMemo(() => {
    if (isSelectedField) return <UpDownIcon />;
    return isAscending ? <TriangleUpIcon /> : <TriangleDownIcon />;
  }, [isAscending, isSelectedField]);

  return (
    <IconButton
      aria-label="Order Icon"
      icon={icon}
      variant="link"
      onClick={onChangeDirection}
    />
  );
}
