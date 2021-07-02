import { Box, Flex } from "@chakra-ui/layout";
import {
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Text,
  Badge,
  Td,
  Alert,
  Button,
} from "@chakra-ui/react";
import Link from "next/link";

import CartItem from "./Components/CartItem";
import { useAppState } from "state";
import httpService from "services/httpService";
import * as storageService from "services/storageService";
import { formatToman } from "services/crrencyService";

function Cart() {
  const { state, dispatch } = useAppState();

  const handleChangeCartItemCount = (itemID, count) => {
    const cartToken = storageService.getItem("cartToken");

    httpService
      .put(
        `/cart/update`,
        {
          id: itemID,
          quantity: count,
        },
        {
          headers: {
            Authorization: `Bearer ${cartToken}`,
          },
        }
      )
      .then((res) => {
        dispatch({
          type: "UPDATE_CART",
          payload: {
            cart: res.data.cart,
          },
        });
      })
      .catch((err) => console.log(err));
  };

  const handleDeleteCartItem = (itemID) => {
    const cartToken = storageService.getItem("cartToken");

    httpService
      .delete(`/cart/${itemID}`, {
        headers: {
          Authorization: `Bearer ${cartToken}`,
        },
      })
      .then((res) => {
        dispatch({
          type: "UPDATE_CART",
          payload: {
            cart: res.data.cart,
          },
        });
      })
      .catch((err) => console.log(err));
  };

  const renderCartItem = state.cart.products.map((cartItem) => (
    <CartItem
      key={cartItem.id}
      title={cartItem.title}
      imgSrc={cartItem.thumbnail}
      quantity={cartItem.quantity}
      count={cartItem.count}
      price={
        cartItem.discountedPrice ? cartItem.discountedPrice : cartItem.price
      }
      onCartCountChange={(valueString, valueNumber) => {
        handleChangeCartItemCount(cartItem.id, valueNumber);
      }}
      onDelete={(e) => {
        handleDeleteCartItem(cartItem.id);
      }}
    />
  ));

  const totalQuantity = state.cart.totalQuantity;

  const subTotal = state.cart.subTotal;

  return (
    <>
      <Flex w="full">
        <Box>
          <Link href="/products">
            <Button>محصولات</Button>
          </Link>
        </Box>
      </Flex>
      <Flex w="100%" mt={6} direction="row" boxShadow="0 0 20px -4px #c8c7cc">
        <Flex
          w="70%"
          direction="column"
          alignItems="center"
          backgroundColor="#fff"
          p={5}
        >
          <Flex
            w="full"
            textAlign="center"
            pb={5}
            mb={6}
            borderBottom="2px solid rgb(200 199 204 / 53%)"
            fontWeight="bold"
            justifyContent="space-between"
          >
            <Text>سبد خرید شما</Text>
            <Text>
              تعداد
              <Badge
                w="20px"
                h="20px"
                colorScheme="purple"
                borderRadius="50%"
                ml={1}
                pt={0.4}
              >
                {state.cart.products.length}
              </Badge>
            </Text>
          </Flex>
          <Table variant="simple">
            <Thead>
              <Tr>
                <Th>عنوان</Th>
                <Th textAlign="center">تعداد</Th>
                <Th textAlign="center">قیمت نهایی</Th>
                <Th textAlign="center">قیمت کل</Th>
                <Th textAlign="center">عملیات</Th>
              </Tr>
            </Thead>
            <Tbody>
              {state.cart.products.length > 0 && <>{renderCartItem}</>}
              {state.cart.products.length === 0 && (
                <Tr>
                  <Td colSpan={5}>
                    <Alert
                      status="warning"
                      direction="column"
                      alignItems="center"
                      m={0}
                    >
                      <Box>
                        <Text>سبد خرید شما خالی است!</Text>
                      </Box>
                      <Box>
                        <Link href="/products">
                          <Button>محصولات</Button>
                        </Link>
                      </Box>
                    </Alert>
                  </Td>
                </Tr>
              )}
            </Tbody>
          </Table>
        </Flex>
        <Flex
          w="30%"
          p={5}
          direction="column"
          alignItems="center"
          backgroundColor="#f6f6f6"
        >
          <Box
            w="full"
            textAlign="center"
            pb={5}
            mb={6}
            borderBottom="2px solid rgb(200 199 204 / 53%)"
            fontWeight="bold"
          >
            <Text>نتیجه پرداخت</Text>
          </Box>
          <Flex
            w="full"
            direction="row"
            justifyContent="space-between"
            borderBottom="2px solid rgb(200 199 204 / 53%)"
            pb={6}
          >
            <Box>
              <Text>
                تعداد کالاها
                <Badge
                  w="20px"
                  h="20px"
                  colorScheme="purple"
                  borderRadius="50%"
                  ml={1}
                  pt={0.5}
                  textAlign="center"
                >
                  {totalQuantity}
                </Badge>
              </Text>
            </Box>
            <Box>{formatToman(subTotal)}</Box>
          </Flex>
          <Flex w="full" direction="row" justifyContent="space-between" pt={5}>
            <Text>جمع کل</Text>
            <Text>{formatToman(subTotal)}</Text>
          </Flex>
        </Flex>
      </Flex>
      {state.cart && state.cart.products.length > 0 && (
        <Flex w="full" justifyContent="center" mt={8}>
          <Box>
            <Link href="/checkout">
              <Button colorScheme="blue">بررسی سفارش</Button>
            </Link>
          </Box>
        </Flex>
      )}
    </>
  );
}

export default Cart;
