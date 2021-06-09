import { ChakraProvider } from "@chakra-ui/react";
import Fonts from "./fonts";
import theme from "./theme";

const App = ({ children }) => (
  <ChakraProvider theme={theme}>
    <Fonts />
    {children}
  </ChakraProvider>
);

export default App;
