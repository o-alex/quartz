import React, { FC, useRef } from 'react';

// Components
import ListItem from '../list/item';
import List, { ListProps } from '../list/container';
// Hooks
import useOnClickOutside from '../../utils/useClickOutside';
// Types
import { DropdownItem } from './types';
import { GetIcon } from '../icon';
import Spinner from '../spinner';
import { Flex } from 'rebass';

export interface DropdownProps extends Omit<ListProps, 'css' | 'children'> {
  items: DropdownItem[];
  isOpen?: boolean;
  onClickOutside?: () => void;
}

const Dropdown: FC<DropdownProps> = ({
  items,
  isOpen = true,
  onClickOutside = () => {},
  ...props
}: DropdownProps) => {
  const containerRef = useRef(null);
  useOnClickOutside(onClickOutside, [containerRef]);

  if (!isOpen) {
    return null;
  }

  return (
    <List {...props} ref={containerRef}>
      {items?.map((item) => {
        const { value, id, icon, hasDivider, onClick, isLoading, disabled } =
          item;

        return (
          <ListItem
            hasDivider={hasDivider}
            key={id || value}
            onClick={() => onClick(item)}
            disabled={disabled}
          >
            <Flex width="100%">
              <Flex flexGrow={1}>
                {icon && (
                  <GetIcon
                    color={disabled ? 'gray' : 'black'}
                    icon={icon}
                    size="sm"
                  />
                )}
                {value}
              </Flex>
              {isLoading && (
                <Spinner
                  size={16}
                  ml="15px"
                  color={disabled ? 'gray' : 'primary'}
                />
              )}
            </Flex>
          </ListItem>
        );
      })}
    </List>
  );
};

export default Dropdown;
