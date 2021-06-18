import { Stack, CheckboxGroup } from "@chakra-ui/react";

import CategoryItem from "./CategoryItem";

function Category({ items, onSetCategory, defaultValue }) {
  const renderCategory = items.map((item) => (
    <CategoryItem
      key={item._id}
      title={item.title}
      value={item.slug}
      onChange={(e) => {
        onSetCategory(e, item.slug);
      }}
    />
  ));

  return (
    <Stack spacing={2} direction="column">
      <CheckboxGroup colorScheme="blue" value={defaultValue}>
        {renderCategory}
      </CheckboxGroup>
    </Stack>
  );
}

export default Category;
