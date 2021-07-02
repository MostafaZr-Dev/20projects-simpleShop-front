import { useState, useEffect } from "react";
import { Skeleton, Stack } from "@chakra-ui/react";

import { getUserOrders } from "services/orderService";
import { useAppState } from "state";
import OrdersList from "./Components/OrdersList";

function Orders() {
  const [isLoading, setIsLoading] = useState(true);
  const [orders, setOrders] = useState([]);
  const { state } = useAppState();

  useEffect(() => {
    const getOrders = async () => {
      const { success, error, orders } = await getUserOrders(state.user.ID);

      if (success) {
        console.log(orders);
        setOrders(orders);
        setIsLoading(false);
        return;
      }

      setIsLoading(false);
    };

    getOrders();
  }, []);

  if (isLoading) {
    return (
      <Stack>
        <Skeleton height="20px" />
        <Skeleton height="20px" />
        <Skeleton height="20px" />
      </Stack>
    );
  }

  return <OrdersList orders={orders} />;
}

export default Orders;
