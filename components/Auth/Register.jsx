import { useState } from "react";
import { Wrap, WrapItem, Input, Flex, Button } from "@chakra-ui/react";
import Link from "next/link";
import { useRouter } from "next/router";

import { register } from "services/authService";

function Register() {
  const [registerData, setRegisterData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    password: "",
  });

  const router = useRouter();

  const updateAuthData = (e) => {
    const field = e.currentTarget.name;
    const value = e.currentTarget.value;

    setRegisterData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const doRegister = async () => {
    const values = Object.values(registerData);

    if (values.includes("")) {
      return;
    }

    const { success, error } = await register(registerData);

    if (success) {
      router.push("/auth");
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
            name="firstName"
            onBlur={updateAuthData}
            placeholder="نام"
          />
        </WrapItem>
        <WrapItem>
          <Input
            variant="outline"
            name="lastName"
            onBlur={updateAuthData}
            placeholder="نام خانوادگی"
          />
        </WrapItem>
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
            name="phone"
            onBlur={updateAuthData}
            placeholder="شماره موبایل"
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
          <Button colorScheme="blue" onClick={doRegister}>
            ایجاد حساب کاربری
          </Button>
        </WrapItem>
        <WrapItem justifyContent="center">
          <Link href="/auth">
            <Button colorScheme="cyan">ورود</Button>
          </Link>
        </WrapItem>
      </Wrap>
    </Flex>
  );
}

export default Register;
