import {
  Checkbox,
  CheckboxGroup,
  Text,
  Heading,
  Stack,
  Wrap,
  WrapItem,
  Button,
} from "@chakra-ui/react";
import React from "react";

function Address({ items }) {
  const renderAddress = items.map((address) => (
    <Checkbox colorScheme="red" defaultIsChecked>
      آدرس 1
    </Checkbox>
  ));
  return (
    <Stack spacing={5} p={4} direction="column" boxShadow="md">
      <Heading as="h5" size="sm">
        انتخاب آدرس
      </Heading>
      {items.length === 0 && (
        <Wrap>
          <WrapItem>
            <Text>آدرسی ثبت نشده است!</Text>
          </WrapItem>
          <WrapItem>
            <Button>اضافه کردن آدرس</Button>
          </WrapItem>
        </Wrap>
      )}
      {items.length > 0 && (
        <CheckboxGroup colorScheme="green" defaultValue={[]}>
          {renderAddress}
        </CheckboxGroup>
      )}
    </Stack>
  );
}

export default Address;
