import { Stack, useToast } from "@chakra-ui/react";

import ProductItem from "./Components/ProductItem";
import { useAppState } from "state";
import httpService from "services/httpService";
import * as storageService from "services/storageService";

function products({ data }) {
  const toast = useToast();

  const { dispatch } = useAppState();

  const handleAddToCart = (product) => {
    const cartToken = storageService.getItem("cartToken");

    httpService
      .post(
        "/cart/add",
        {
          product: {
            id: product.id,
            title: product.title,
            thumbnail: product.thumbnail,
            price: product.price,
            discountedPrice: product.discountedPrice,
            count: product.count,
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

        dispatch({
          type: "UPDATE_CART",
          payload: {
            cart: res.data.cart,
          },
        });

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

  const renderProducts = data.map((product) => (
    <ProductItem
      id={product.id}
      key={product.id}
      title={product.title}
      imgSrc={product.thumbnail}
      price={product.price}
      discountedPrice={product.discountedPrice}
      onAddToCart={(e) => {
        handleAddToCart(product);
      }}
    />
  ));

  return (
    <Stack
      direction="row"
      wrap="wrap"
      justifyContent="center"
      spacing={8}
      w="100%"
      pt={10}
      pb={10}
    >
      {renderProducts}
    </Stack>
  );
}

export default products;
