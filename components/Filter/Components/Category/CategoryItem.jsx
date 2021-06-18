import { Checkbox } from "@chakra-ui/react";

function CategoryItem({ title, value,onChange }) {
  return <Checkbox size="lg" value={value} onChange={onChange}>{title}</Checkbox>;
}

export default CategoryItem;
