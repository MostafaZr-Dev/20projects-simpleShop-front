import { Flex } from "@chakra-ui/react";

import Layout from "components/Layout";
import { Register } from "components/Auth";


function register() {
  return (
    <Layout title="ثبت نام در سایت">
      <Flex w="full" p={4}>
        <Register />
      </Flex>
    </Layout>
  );
}

export default register;
