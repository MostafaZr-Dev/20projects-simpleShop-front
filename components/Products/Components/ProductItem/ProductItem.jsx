import {
  Flex,
  Heading,
  Box,
  Text,
  Button,
  WrapItem,
  Icon,
} from "@chakra-ui/react";
import Image from "next/image";
import Link from "next/link";
import { HiHeart } from "react-icons/hi";

import { formatToman } from "services/crrencyService";

const imageLoader = ({ src, width, quality }) => {
  return `${src}`;
};

function ProductItem({
  id,
  title,
  imgSrc,
  price,
  discountedPrice,
  onAddToCart,
  category,
  likes,
  soldCount,
}) {
  return (
    <WrapItem w="30%">
      <Flex
        w="full"
        direction="column"
        h="500px"
        alignItems="center"
        backgroundColor="#fff"
        shadow="md"
      >
        <Box w="100%" pos="relative" h="50%" mb={4}>
          <Image
            loader={imageLoader}
            layout="fill"
            src={imgSrc}
            alt="product-img"
          />
        </Box>
        <Heading as="h2" size="sm" mb={4}>
          <Link
            href={{
              pathname: "/products/[id]",
              query: {
                id,
              },
            }}
          >
            {title}
          </Link>
        </Heading>
        <Box mb={3}>
          <Box textAlign="center">
            <Text as={discountedPrice ? "del" : ""}>{formatToman(price)}</Text>
            {discountedPrice > 0 && <Text>{formatToman(discountedPrice)}</Text>}
          </Box>
        </Box>
        <Flex
          w="100%"
          pr={3}
          pl={3}
          mb={3}
          direction="row"
          justifyContent="space-between"
        >
          <Text>تعداد فروش : {soldCount}</Text>
          <Text textAlign="center">
            {likes}
            <Icon as={HiHeart} color="red" />
          </Text>
        </Flex>
        <Button colorScheme="blue" onClick={onAddToCart}>
          افزودن به سبد خرید
        </Button>
        <Box mt={2}>
          <Text>دسته بندی : {category}</Text>
        </Box>
      </Flex>
    </WrapItem>
  );
}

export default ProductItem;
