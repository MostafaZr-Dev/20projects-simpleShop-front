import {
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  MenuItemOption,
  MenuGroup,
  MenuOptionGroup,
  MenuIcon,
  MenuCommand,
  MenuDivider,
  Button,
} from "@chakra-ui/react";
import { Icon } from "@chakra-ui/react";
import { HiUserCircle, HiChevronDown } from "react-icons/hi";

function User({ name, onLogout }) {
  return (
    <Menu>
      <MenuButton
        as={Button}
        px={1}
        py={1}
        backgroundColor="transparent"
        w="fit-content"
      >
        <Icon as={HiUserCircle} color="#fff" boxSize="2em" />
      </MenuButton>
      <MenuList>
        <MenuItem>{name}</MenuItem>
        <MenuDivider />
        <MenuItem onClick={onLogout}>خروج</MenuItem>
      </MenuList>
    </Menu>
  );
}

export default User;
