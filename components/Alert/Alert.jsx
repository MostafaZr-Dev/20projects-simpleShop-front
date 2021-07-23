import React from "react";
import {
  Alert,
  AlertIcon,
  AlertTitle,
} from "@chakra-ui/react";

function CustomAlert({type, message}) {
  return (
    <Alert status={type}>
      <AlertIcon />
      <AlertTitle mr={2}>{message}</AlertTitle>
    </Alert>
  );
}

export default CustomAlert;
