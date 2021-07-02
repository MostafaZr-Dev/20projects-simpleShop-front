import { useEffect } from "react";
import Head from "next/head";
import { Flex, Heading, Box } from "@chakra-ui/react";
import { useRouter } from "next/router";
import Link from "next/link";

import { useAppState } from "state";
import Sidebar from "../Components/Sidebar";
import Content from "../Components/Content";
import User from "../Components/User";
import { logout } from "services/authService";
import Loader from "components/Loader";

function Layout({ pageTitle, children }) {
  const { state, dispatch } = useAppState();

  const router = useRouter();

  const { user } = state;

  const logoutUser = () => {
    logout();
    dispatch({
      type: "SET_USER",
      payload: {
        user: null,
      },
    });
  };

  useEffect(() => {
    if (!user) {
      router.push("/products");
    }
  }, [user]);

  if (!user) {
    return <Loader />;
  }

  return (
    <Flex>
      <Head>
        <title>حساب کاربری</title>
      </Head>
      <Flex w="full" direction="column">
        <Flex
          w="full"
          pr={5}
          pl={5}
          backgroundColor="blue.600"
          h="80px"
          alignItems="center"
          justifyContent="space-between"
        >
          <Flex w="fit-content" alignItems="center">
            <Heading as="h5" size="sm" color="#fff">
              حساب کاربری
            </Heading>
            <Box
              ml={3}
              p={3}
              pt={2}
              pb={2}
              borderRadius={5}
              backgroundColor="orange.600"
            >
              <Link href="/products">فروشگاه</Link>
            </Box>
          </Flex>
          <Box>
            <User name={user ? user.displayName : null} onLogout={logoutUser} />
          </Box>
        </Flex>
        <Flex w="full" direction="row">
          <Flex w="20%" backgroundColor="#a0aec0" minHeight="100vh" h="100%">
            <Sidebar />
          </Flex>
          <Flex w="80%" p={4}>
            <Content title={pageTitle}>{children}</Content>
          </Flex>
        </Flex>
      </Flex>
    </Flex>
  );
}

export default Layout;
