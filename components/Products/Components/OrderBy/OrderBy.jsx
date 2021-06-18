import { Box, Flex, HStack, Wrap, WrapItem } from "@chakra-ui/layout";
import { Text } from "@chakra-ui/react";
import { useRadioGroup } from "@chakra-ui/radio";
import Icon from "@chakra-ui/icon";
import { MdSort } from "react-icons/md";

import OrderByItem from "./OrderByItem";

const options = [
  {
    title: "جدیدترین",
    key: "date-desc",
  },
  {
    title: "محبوب ترین",
    key: "likes-desc",
  },
  {
    title: "پرفروش ترین",
    key: "sold-desc",
  },
  {
    title: "گران ترین",
    key: "price-desc",
  },
  {
    title: "ارزان ترین",
    key: "price-asc",
  },
];

function OrderBy({ defaultValue, onChange }) {
  const { getRootProps, getRadioProps } = useRadioGroup({
    name: "orderBy",
    defaultValue: defaultValue ? defaultValue : "date-desc",
    onChange: onChange,
  });

  const group = getRootProps();

  return (
    <HStack
      w="full"
      mb={8}
      pt={3}
      pb={3}
      pl={2}
      boxShadow="md"
      backgroundColor="#fff"
      {...group}
    >
      <Flex direction="row" alignItems="center">
        <Icon mr={1} as={MdSort} boxSize="1.5em" />
        <Text mr={2}>مرتب سازی بر اساس: </Text>
      </Flex>
      {options.map((value) => {
        const radio = getRadioProps({ value: value.key });
        return (
          <OrderByItem key={value.key} {...radio}>
            {value.title}
          </OrderByItem>
        );
      })}
    </HStack>
  );
}

export default OrderBy;
