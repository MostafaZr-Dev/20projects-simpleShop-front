import { Box, Text } from "@chakra-ui/react";

function Container({ title, children }) {
  return (
    <Box w="full" p={5} mb={2} backgroundColor="#fff" boxShadow="md">
      <Text mb={3} pb={2} borderBottom="1px solid #eee">
        {title}
      </Text>
      {children}
    </Box>
  );
}

export default Container;
