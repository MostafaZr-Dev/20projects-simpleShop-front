import { Flex } from "@chakra-ui/react";

import Layout from "components/Layout";
import Checkout from "components/Checkout";

function CheckoutPage() {
  return (
    <Layout title="بررسی سفارش">
      <Flex w="full" direction="column" p={4}>
        <Checkout />
      </Flex>
    </Layout>
  );
}

export default CheckoutPage;
