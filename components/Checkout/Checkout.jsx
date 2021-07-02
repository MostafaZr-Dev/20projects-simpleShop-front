import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { Wrap, WrapItem } from "@chakra-ui/layout";
import { Button, useToast } from "@chakra-ui/react";

import * as orderService from "services/orderService";
import Address from "./Components/Address";
import Loader from "components/Loader";

import { useAppState } from "state";

function Checkout() {
  const router = useRouter();
  const { state } = useAppState();
  const toast = useToast();

  const { user } = state;

  useEffect(() => {
    if (!user) {
      router.push("/auth");
    }
  }, [user]);

  const createOrder = async () => {
    const { success, error } = await orderService.create({
      userID: state.user.ID,
      cart: state.cart,
    });

    if (success) {
      toast({
        title: "سفارش شما ثبت شد",
        status: "success",
        duration: 2000,
        position: "top",
      });
      setTimeout(() => {
        window.location.replace("/profile/orders");
      }, 2000);
    }
  };

  if (!user) {
    return <Loader />;
  }

  return (
    <Wrap w="full" spacing={3} direction="row">
      <WrapItem w="65%" boxShadow="md">
        <Address items={user ? user.address : []} />
      </WrapItem>
      <WrapItem w="30%" boxShadow="md">
        cart
      </WrapItem>
      <WrapItem w="full" justifyContent="center">
        <Button onClick={createOrder} colorScheme="blue">
          ثبت سفارش
        </Button>
      </WrapItem>
    </Wrap>
  );
}

export default Checkout;
