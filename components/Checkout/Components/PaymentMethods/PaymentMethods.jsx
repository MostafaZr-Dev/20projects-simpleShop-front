import { useState, useEffect } from "react";
import { Heading, Stack, Select, RadioGroup, Radio } from "@chakra-ui/react";

function PaymentMethods({ methods, onPaymentSelect }) {
  const [payMethod, setPayMethod] = useState(null);
  const [selectedMethod, setSelectedMethod] = useState(null);
  const [methodGateway, setMethodGateway] = useState(null);

  useEffect(() => {
    if (payMethod !== null) {
      onPaymentSelect(payMethod, methodGateway);
    }
  }, [payMethod, methodGateway]);

  return (
    <Stack w="full" spacing={5} p={4} direction="column" boxShadow="md">
      <Heading as="h5" size="sm">
        روش پرداخت
      </Heading>
      <Select
        placeholder="انتخاب روش پرداخت"
        onChange={(e) => {
          setPayMethod(e.target.value);
          setSelectedMethod(
            methods.filter((method) => method.name === e.target.value).pop()
          );
        }}
      >
        {methods.map((method, index) => (
          <option key={`method-${index}`} value={method.name}>
            {method.title}
          </option>
        ))}
      </Select>
      {selectedMethod && selectedMethod.gateways && (
        <RadioGroup onChange={setMethodGateway} value={methodGateway}>
          <Stack direction="column">
            {selectedMethod.gateways.map((gateway, index) => (
              <Radio
                key={`gateway-${index}`}
                name="gateway"
                value={gateway.name}
              >
                {gateway.title}
              </Radio>
            ))}
          </Stack>
        </RadioGroup>
      )}
    </Stack>
  );
}

export default PaymentMethods;
