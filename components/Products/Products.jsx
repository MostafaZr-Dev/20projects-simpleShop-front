import { useCallback } from "react";
import { useToast, Wrap, WrapItem, Text, Flex } from "@chakra-ui/react";
import { useRouter } from "next/router";

import ProductItem from "./Components/ProductItem";
import OrderBy from "./Components/OrderBy";
import { useAppState } from "state";
import httpService from "services/httpService";
import * as storageService from "services/storageService";
import {
  addSimpleQuery,
  stringifyQuery,
  parseQuery,
} from "services/queryString";

function products({ data }) {
  const toast = useToast();
  const router = useRouter();

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

  const handleChangeOrder = (value) => {
    const query = addSimpleQuery(router.query, "sortby", value);

    router.push({
      pathname: router.pathname,
      query,
    });
  };

  const getAppliedOrder = useCallback(() => {
    const query = parseQuery(stringifyQuery(router.query));

    const { sortby } = query;

    return sortby ? sortby : null;
  }, [router.query]);

  const renderProducts = data.map((product) => (
    <ProductItem
      id={product.id}
      key={product.id}
      title={product.title}
      imgSrc={product.thumbnail}
      price={product.price}
      discountedPrice={product.discountedPrice}
      soldCount={product.soldCount}
      category={product.category.title}
      likes={product.likes}
      onAddToCart={(e) => {
        handleAddToCart(product);
      }}
    />
  ));

  const defaultOrder = getAppliedOrder();

  return (
    <Flex w="full" direction="column" p={3}>
      <OrderBy defaultValue={defaultOrder} onChange={handleChangeOrder} />
      <Wrap w="full" spacing={5}>
        {data.length === 0 && (
          <WrapItem w="full">
            <Text>محصولی پیدا نشد!</Text>
          </WrapItem>
        )}
        {data.length > 0 && <> {renderProducts} </>}
      </Wrap>
    </Flex>
  );
}

export default products;
