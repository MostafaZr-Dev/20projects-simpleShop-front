import React, { useEffect } from "react";
import { Flex, Box, Text } from "@chakra-ui/react";
import { useRouter } from "next/router";

import Layout from "components/Layout";
import { useAppState } from "state";

function confirm() {
  const router = useRouter();
  const { dispatch } = useAppState();

  useEffect(() => {
    dispatch({
      type: "EMPTY_CART",
    });
  }, []);

  if (router.query.cod) {
  }

  return (
    <Layout title="فروشگاه | نتیجه سفارش">
      <Flex w="full" justifyContent="center" mt={4}>
        <Box w="70%" boxShadow="md" p={4}>
          <Box bgColor="green.600" p={3}>
            <Text color="white">سفارش شما ثبت شد</Text>
          </Box>
        </Box>
      </Flex>
    </Layout>
  );
}

export default confirm;
