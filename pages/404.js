import { Flex } from "@chakra-ui/layout";
import { Button, Text } from "@chakra-ui/react";
import Head from "next/head";
import Link from "next/link";

function NotFound() {
  return (
    <Flex
      w="full"
      h="100vh"
      backgroundColor="#eee"
      justifyContent="center"
      alignItems="center"
      direction="column"
    >
      <Head>
        <title>صفحه پیدا نشد!</title>
      </Head>
      <Text textAlign="left" mb={5} fontSize="2rem" fontWeight="bold">
        Page Not Found - 404
      </Text>
      <Link href="/products">
        <Button colorScheme="blue">بازگشت به صفحه اصلی</Button>
      </Link>
    </Flex>
  );
}

export default NotFound;
