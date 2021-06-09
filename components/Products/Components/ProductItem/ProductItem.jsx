import { Flex, Heading, Box, Text, Button } from "@chakra-ui/react";
import Image from "next/image";
import Link from "next/link";

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
}) {
  return (
    <Flex
      w="30%"
      direction="column"
      h="350px"
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
        <Text as={discountedPrice ? "del" : ""}>{formatToman(price)}</Text>
        {discountedPrice > 0 && <Text>{formatToman(discountedPrice)}</Text>}
      </Box>
      <Button colorScheme="blue" onClick={onAddToCart}>
        افزودن به سبد خرید
      </Button>
    </Flex>
  );
}

export default ProductItem;
