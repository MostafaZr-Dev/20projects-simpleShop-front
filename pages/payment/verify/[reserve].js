import React, { useEffect } from "react";
import Link from "next/link";
import { Flex, Box, Text, Button } from "@chakra-ui/react";

import Layout from "components/Layout";
import usePostAPI from "hooks/usePostAPI";
import Alert from "components/Alert";
import { useAppState } from "state";

const getPaymentParams = () => {
  const url = new URL(location.href);

  return {
    reserve: url.pathname.split("/")[3],
    authority: url.searchParams.get("Authority"),
    status: url.searchParams.get("Status"),
  };
};

function PaymentVerifyPage() {
  const params = getPaymentParams();
  const { dispatch } = useAppState();

  const [verifyPaymentResponse, verifyPaymentAPI] = usePostAPI({
    url: "/purchase/verification",
    configs: {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    },
  });

  const { isLoading, success, error, data } = verifyPaymentResponse;

  useEffect(() => {
    verifyPaymentAPI({
      authority: params.authority,
      status: params.status,
      reserve: params.reserve,
      cartToken: localStorage.getItem("cartToken"),
    });
  }, []);

  useEffect(() => {
    if (success || error) {
      dispatch({
        type: "EMPTY_CART",
        payload: null,
      });
    }
  }, [success, error]);

  return (
    <Layout title="فروشگاه | نتیجه پرداخت">
      <Flex w="full" justifyContent="center" mt={5}>
        <Box w="70%" boxShadow="md" p={3}>
          <Text mb={3}>نتیجه پرداخت</Text>
          {isLoading && <Text>در حال بررسی تراکنش...</Text>}
          {!isLoading && success && data?.success && (
            <Alert
              type="success"
              message={`پرداخت موفق : شماره پیگیری ${data?.refID}`}
            />
          )}
          {!isLoading && success && !data?.success && (
            <Alert type="error" message="پرداخت ناموفق" />
          )}
          {!isLoading && error && (
            <Alert type="error" message="پرداخت ناموفق" />
          )}

          {!isLoading && (
            <Link href="/products">
              <a>
                <Button mt={4}>صفحه اصلی</Button>
              </a>
            </Link>
          )}
        </Box>
      </Flex>
    </Layout>
  );
}

export default PaymentVerifyPage;
