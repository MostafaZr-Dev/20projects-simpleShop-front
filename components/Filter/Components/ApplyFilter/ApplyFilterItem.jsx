import { Text } from "@chakra-ui/react";
import { Tag, TagCloseButton, TagLabel } from "@chakra-ui/tag";

function ApplyFilterItem({ title, data, onDelete }) {
  return (
    <Tag size="md" p={2} borderRadius="full" variant="solid" colorScheme="blue">
      <TagLabel w="85%">
        <Text mb={2} pl={4}>
          {title}
        </Text>
        <Text pl={4}>{data}</Text>
      </TagLabel>
      <TagCloseButton onClick={onDelete} />
    </Tag>
  );
}

export default ApplyFilterItem;
