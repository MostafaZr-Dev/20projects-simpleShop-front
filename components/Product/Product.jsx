import { Box, Button, Flex, Heading, Text, useToast } from "@chakra-ui/react";

import ImageSlider from "components/Slider";
import { useAppState } from "state";
import httpService from "services/httpService";
import * as storageService from "services/storageService";
import { formatToman } from "services/crrencyService";

function Product({ data }) {
  const toast = useToast();

  const { dispatch } = useAppState();

  const handleAddToCart = () => {
    const cartToken = storageService.getItem("cartToken");

    httpService
      .post(
        "/cart/add",
        {
          product: {
            id: data.id,
            title: data.title,
            thumbnail: data.thumbnail,
            price: data.price,
            discountedPrice: data.discountedPrice,
            count: data.count,
          },
          quantity: 1,
        },
        {
          headers: {
            Authorization: cartToken ? `Bearer ${cartToken}` : "",
          },
        }
      )
      .then((res) => {
        storageService.setItem("cartToken", res.data.cartToken);
        storageService.setItem("cart", JSON.stringify(res.data.cart));

        dispatch({
          type: "UPDATE_CART",
          payload: {
            cart: res.data.cart,
          },
        });

        console.log(res.data);
        toast({
          title: "محصول به سبد خرید اضافه شد.",
          status: "success",
          duration: 1000,
          isClosable: true,
          position: "top",
        });
      })
      .catch((err) => console.log(err));
  };

  return (
    <Flex w="100%" direction="row" mt={10}>
      <Flex w="50%" p={5}>
        <ImageSlider images={data.gallery} />
      </Flex>
      <Flex w="50%" direction="column">
        <Heading as="h1" fontSize="1.5rem" mb={3}>
          {data.title}
        </Heading>
        <Box mb={3}>
          <Text as={data.discountedPrice ? "del" : ""}>
            {formatToman(data.price)}
          </Text>
          {data.discountedPrice > 0 && (
            <Text>{formatToman(data.discountedPrice)}</Text>
          )}
        </Box>
        <Button w="50%" colorScheme="blue" onClick={handleAddToCart}>
          افزودن به سبد خرید
        </Button>
      </Flex>
    </Flex>
  );
}

export default Product;
