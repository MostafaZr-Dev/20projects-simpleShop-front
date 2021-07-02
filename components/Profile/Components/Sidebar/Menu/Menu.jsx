import { Accordion } from "@chakra-ui/react";
import Link from "next/link";
import { Icon } from "@chakra-ui/react";
import { HiShoppingBag, HiUser } from "react-icons/hi";

import MenuItem from "./MenuItem";

function Menu() {
  return (
    <Accordion w="full" pt={6}>
      <MenuItem
        title="سفارش های شما"
        icon={<Icon as={HiShoppingBag} boxSize="1.5em" mr={2} />}
      >
        <Link href="/profile/orders">لیست سفارشات</Link>
      </MenuItem>

      <MenuItem
        title="پروفایل"
        icon={<Icon as={HiUser} boxSize="1.5em" mr={2} />}
      >
        اطلاعات حساب
      </MenuItem>
    </Accordion>
  );
}

export default Menu;
