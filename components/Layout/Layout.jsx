import { Flex } from "@chakra-ui/react";

import Header from "./Components/Header";

function Layout({ title, children }) {
  return (
    <Flex direction="column">
      <Flex>
        <Header title={title} />
      </Flex>
      {children}
    </Flex>
  );
}

export default Layout;
