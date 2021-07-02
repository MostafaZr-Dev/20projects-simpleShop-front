import { Box, Flex, Heading, Button, Badge, Text } from "@chakra-ui/react";
import Head from "next/head";
import Link from "next/link";
import { useRouter } from "next/router";
import { Icon } from "@chakra-ui/react";
import { HiShoppingCart, HiUserCircle } from "react-icons/hi";

import { useAppState } from "state";
import Search from "components/Search";

function Header({ title }) {
  const { state } = useAppState();
  const router = useRouter();

  const cartCount = state.cart.products?.length || 0;

  const setSearchQuery = (query) => {
    console.log(query);
    router.push({
      query: {
        ...router.query,
        q: query,
      },
    });
  };

  return (
    <Box w="100%" h="80px" backgroundColor="#0c4271">
      <Head>
        <title>{title}</title>
        <meta name="description" content="Generated by create next app" />
      </Head>
      <Flex
        direction="row"
        alignItems="center"
        justifyContent="space-between"
        w="100%"
        pr={4}
        pl={4}
        h="100%"
      >
        <Heading color="#fff" size="md">
          {title}
        </Heading>
        <Box>
          <Search onSearch={setSearchQuery} />
        </Box>
        <Box>
          <Link href="/cart">
            <Button backgroundColor="transparent" position="relative">
              <Icon as={HiShoppingCart} color="#fff" boxSize="2em" />
              <Badge
                ml="1"
                fontSize="0.8em"
                colorScheme="green"
                position="absolute"
                top="2px"
                left="10px"
                borderRadius="50%"
              >
                <Text>{cartCount}</Text>
              </Badge>
            </Button>
          </Link>
          {state.user && (
            <Link href="/profile">
              <Button backgroundColor="transparent" position="relative">
                <Icon as={HiUserCircle} color="#fff" boxSize="2em" />
              </Button>
            </Link>
          )}
        </Box>
      </Flex>
    </Box>
  );
}

export default Header;
