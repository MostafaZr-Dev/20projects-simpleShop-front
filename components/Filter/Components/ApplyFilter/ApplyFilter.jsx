import { Stack } from "@chakra-ui/layout";
import ApplyFilterItem from "./ApplyFilterItem";

function ApplyFilter({ items, onDeleteAppliedFilter }) {
  const renderFilterItems = items.map((filterItem, index) => (
    <ApplyFilterItem
      key={index}
      title={filterItem.title}
      data={filterItem.data}
      onDelete={(e) => {
        onDeleteAppliedFilter(filterItem.key, filterItem.value);
      }}
    />
  ));

  return (
    <Stack spacing={2} direction="column">
      {renderFilterItems}
    </Stack>
  );
}

export default ApplyFilter;
