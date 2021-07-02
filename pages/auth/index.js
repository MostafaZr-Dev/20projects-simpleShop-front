import { Flex } from "@chakra-ui/react";

import Layout from "components/Layout";
import Auth from "components/Auth";

function AuthPage() {
  return (
    <Layout title="ورود به سایت">
      <Flex w="full" p={4}>
        <Auth />
      </Flex>
    </Layout>
  );
}

export default AuthPage;
