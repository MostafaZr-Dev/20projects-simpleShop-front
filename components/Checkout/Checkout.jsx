import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { Wrap, WrapItem } from "@chakra-ui/layout";
import { Button, useToast } from "@chakra-ui/react";

import Address from "./Components/Address";
import PaymentMethods from "./Components/PaymentMethods";
import Loader from "components/Loader";
import useGetAPI from "hooks/useGetAPI";
import usePostAPI from "hooks/usePostAPI";

import { useAppState } from "state";

function Checkout() {
  const [methods, setMethods] = useState([]);
  const [selectedMethod, setSelectedMethod] = useState({
    method: null,
    gateway: null,
  });

  const router = useRouter();
  const { state } = useAppState();
  const toast = useToast();

  const [getMethodsResponse, getMethodsFromAPI] = useGetAPI({
    url: "/payment/methods",
    header: {},
  });

  const [payOrderResponse, payOrderAPI] = usePostAPI({
    url: "/purchase",
    configs: {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    },
  });

  const {
    isLoading: getMethodsLoading,
    success: getMethodsSuccess,
    error: getMethodsError,
    data: getMethodsData,
  } = getMethodsResponse;

  const {
    isLoading: payOrderLoading,
    success: payOrderSuccess,
    error: payOrderError,
    data: payOrderData,
  } = payOrderResponse;

  const { user } = state;

  useEffect(() => {
    if (!user) {
      router.push("/auth");
    }
  }, [user]);

  useEffect(() => {
    if (user && getMethodsSuccess) {
      setMethods(getMethodsData.methods);
    }
  }, [getMethodsSuccess]);

  useEffect(() => {
    if (payOrderSuccess) {
      if (payOrderData.url) {
        window.location.replace(payOrderData.url);
      } else {
        router.push({
          pathname: "/payment/confirm",
          query: {
            cod: "cod",
          },
        });
      }
    }
  }, [payOrderSuccess]);

  useEffect(() => {
    if (user) {
      getMethodsFromAPI();
    }
  }, []);

  const createOrder = () => {
    if (!selectedMethod.method || selectedMethod.method === "") {
      toast({
        title: "روش پرداخت انتخاب نشده است!",
        status: "warning",
        duration: 2000,
        isClosable: true,
        position: "top",
      });
      return;
    }

    if (selectedMethod.method === "online" && !selectedMethod.gateway) {
      toast({
        title: "درگاه آنلاین انتخاب نشده است!",
        status: "warning",
        duration: 2000,
        isClosable: true,
        position: "top",
      });
      return;
    }

    payOrderAPI({
      method: selectedMethod.method,
      gateway: selectedMethod.gateway,
      cart: state.cart,
      cartToken: localStorage.getItem("cartToken"),
    });
  };

  const handleSelectPaymentMethod = (payMethod, methodGateway) => {
    setSelectedMethod({
      method: payMethod,
      gateway: methodGateway,
    });
  };

  if (!user) {
    return <Loader />;
  }

  return (
    <Wrap w="full" spacing={3} direction="row">
      <WrapItem w="65%">
        <Wrap w="full" spacing={2} direction="column">
          <WrapItem w="full">
            <Address items={user ? user.address : []} />
          </WrapItem>
          <WrapItem w="full">
            <PaymentMethods
              methods={Object.values(methods)}
              onPaymentSelect={handleSelectPaymentMethod}
            />
          </WrapItem>
        </Wrap>
      </WrapItem>
      <WrapItem w="30%" boxShadow="md">
        cart
      </WrapItem>
      <WrapItem w="full" justifyContent="center">
        <Button onClick={createOrder} colorScheme="blue">
          {!payOrderLoading && <span>ثبت سفارش</span>}
          {payOrderLoading && selectedMethod.method === "online" && (
            <span>در حال انتقال به درگاه...</span>
          )}
          {payOrderLoading && selectedMethod.method === "cod" && (
            <span>در حال آماده سازی...</span>
          )}
        </Button>
      </WrapItem>
    </Wrap>
  );
}

export default Checkout;
