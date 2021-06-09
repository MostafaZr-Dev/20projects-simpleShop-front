import {
  Tr,
  Td,
  Text,
  HStack,
  Input,
  Button,
  useNumberInput,
} from "@chakra-ui/react";
import { Box, Flex } from "@chakra-ui/layout";
import Image from "next/image";
import { Icon } from "@chakra-ui/react";
import { HiTrash } from "react-icons/hi";

import { formatToman } from "services/crrencyService";

const imageLoader = ({ src, width, quality }) => {
  return `${src}`;
};

function CartItem({
  title,
  imgSrc,
  quantity,
  count,
  price,
  onCartCountChange,
  onDelete,
}) {
  const { getInputProps, getIncrementButtonProps, getDecrementButtonProps } =
    useNumberInput({
      step: 1,
      defaultValue: quantity,
      min: 1,
      max: count,
      onChange: onCartCountChange,
      size: "sm",
      isFullWidth: false,
    });

  const inc = getIncrementButtonProps();
  const dec = getDecrementButtonProps();
  const input = getInputProps({ isReadOnly: true });

  return (
    <Tr textAlign="center">
      <Td>
        <Flex direction="row" alignItems="center">
          <Box
            w="50px"
            h="50px"
            borderRadius="50%"
            overflow="hidden"
            mr={2}
            position="relative"
          >
            <Image
              loader={imageLoader}
              layout="fill"
              src={imgSrc}
              alt="product-img"
            />
          </Box>
          <Text>{title}</Text>
        </Flex>
      </Td>
      <Td>
        <HStack maxW="320px">
          <Button backgroundColor="green" color="#fff" {...inc}>
            +
          </Button>
          <Input {...input} />
          <Button backgroundColor="red" color="#fff" {...dec}>
            -
          </Button>
        </HStack>
      </Td>
      <Td>{formatToman(price)}</Td>
      <Td>{formatToman(price * quantity)}</Td>
      <Td>
        <Button backgroundColor="transparent" onClick={onDelete}>
          <Icon as={HiTrash} color="red" />
        </Button>
      </Td>
    </Tr>
  );
}

export default CartItem;
