import { useState } from "react";
import { Wrap, WrapItem, Input, Flex, Button } from "@chakra-ui/react";
import Link from "next/link";

import { login } from "services/authService";
import * as storageService from "services/storageService";

function Auth() {
  const [authData, setAuthData] = useState({
    email: "",
    password: "",
  });

  const updateAuthData = (e) => {
    const field = e.currentTarget.name;
    const value = e.currentTarget.value;

    setAuthData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const doLogin = async () => {
    if (authData.email === "" && authData.password === "") {
      return;
    }

    const { success, token, error } = await login(authData);

    if (success) {
      storageService.setItem("token", token);
      location.replace("/products");
      return;
    }
  };

  return (
    <Flex w="full" justifyContent="center">
      <Wrap
        w="50%"
        direction="column"
        justifyContent="center"
        alignItems="center"
        boxShadow="md"
        p={3}
        spacing="30px"
      >
        <WrapItem>
          <Input
            variant="outline"
            name="email"
            onBlur={updateAuthData}
            type="email"
            placeholder="ایمیل"
          />
        </WrapItem>
        <WrapItem>
          <Input
            variant="outline"
            name="password"
            onBlur={updateAuthData}
            type="password"
            placeholder="رمز عبور"
          />
        </WrapItem>
        <WrapItem justifyContent="center">
          <Button colorScheme="blue" onClick={doLogin}>
            ورود
          </Button>
        </WrapItem>
        <WrapItem justifyContent="center">
          <Link href="/auth/register">
            <Button colorScheme="cyan">ایجاد حساب کاربری</Button>
          </Link>
        </WrapItem>
      </Wrap>
    </Flex>
  );
}

export default Auth;
