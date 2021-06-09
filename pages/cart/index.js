import { Flex } from "@chakra-ui/react";

import Cart from "components/Cart";
import Layout from "components/Layout";

function CartPage() {
  return (
    <Layout title="سبدخرید">
      <Flex direction="column" p={4}>
        <Cart />
      </Flex>
    </Layout>
  );
}

export default CartPage;
