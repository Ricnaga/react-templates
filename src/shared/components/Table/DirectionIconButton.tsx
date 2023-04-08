import { TriangleDownIcon, TriangleUpIcon, UpDownIcon } from '@chakra-ui/icons';
import { IconButton } from '@chakra-ui/react';

interface DirectionIconButtonProps {
  onChangeDirection: () => void;
  sortField: string | number | symbol | undefined;
  fieldName: string | number | symbol;
  order: 'ASC' | 'DESC';
}

export function DirectionIconButton({
  onChangeDirection,
  fieldName,
  sortField,
  order,
}: DirectionIconButtonProps) {
  if (fieldName !== sortField)
    return (
      <IconButton
        aria-label="Order Icon"
        icon={<UpDownIcon />}
        variant="link"
        onClick={onChangeDirection}
      />
    );

  return (
    <IconButton
      aria-label="Order Icon"
      icon={order === 'ASC' ? <TriangleUpIcon /> : <TriangleDownIcon />}
      variant="link"
      onClick={onChangeDirection}
    />
  );
}
