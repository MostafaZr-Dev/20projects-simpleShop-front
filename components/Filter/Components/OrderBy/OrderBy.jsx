import { useState } from "react";
import { Stack } from "@chakra-ui/layout";
import { Radio, RadioGroup } from "@chakra-ui/react";

function OrderBy({ onChange }) {
  const [order, setOrder] = useState("date-desc");

  const handleChangeOreder = (value) => {
    setOrder(value);

    onChange(value);
  };

  return (
    <RadioGroup onChange={handleChangeOreder} value={order}>
      <Stack direction="column">
        <Radio value="date-desc">جدیدترین</Radio>
        <Radio value="sold-desc">پرفروش ترین</Radio>
        <Radio value="likes-desc">محبوب ترین</Radio>
        <Radio value="price-desc">گران ترین</Radio>
        <Radio value="price-asc">ارزان ترین</Radio>
      </Stack>
    </RadioGroup>
  );
}

export default OrderBy;
