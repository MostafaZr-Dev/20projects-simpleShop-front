import { Flex, Heading, Box } from "@chakra-ui/react";
import React from "react";

function Content({ title, children }) {
  return (
    <Flex w="full" direction="column" boxShadow="lg" p={5}>
      <Box backgroundColor="blue.600" mb={5} w="fit-content" p={5} h="auto">
        <Heading as="h5" size="sm" color="white">
          {title}
        </Heading>
      </Box>
      {children}
    </Flex>
  );
}

export default Content;
