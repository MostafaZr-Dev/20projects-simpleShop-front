import {
  AccordionItem,
  AccordionButton,
  AccordionPanel,
  AccordionIcon,
  Box,
} from "@chakra-ui/react";

function MenuItem({ title, icon, children }) {
  return (
    <AccordionItem>
      <h2>
        <AccordionButton pt={5} pb={5}>
          <Box flex="1" textAlign="left">
            {icon}
            {title}
          </Box>
          <AccordionIcon />
        </AccordionButton>
      </h2>
      <AccordionPanel pb={4}>{children}</AccordionPanel>
    </AccordionItem>
  );
}

export default MenuItem;
