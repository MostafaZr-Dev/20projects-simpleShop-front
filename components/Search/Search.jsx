import { useState } from "react";
import { Button } from "@chakra-ui/button";
import { InputGroup, Input, InputRightElement } from "@chakra-ui/input";
import { Icon } from "@chakra-ui/react";
import { HiSearch } from "react-icons/hi";

function Search({ onSearch }) {
  const [query, setQuery] = useState("");

  const handleChangeText = (e) => {
    setQuery(e.target.value);
  };

  const handleClickSearchBtn = () => {
    onSearch(query);
  };

  return (
    <InputGroup size="md">
      <Input
        pr="4.5rem"
        type="text"
        color="#fff"
        placeholder="عنوان محصول موردنظر را وارد کنید..."
        onChange={handleChangeText}
      />
      <InputRightElement width="4.5rem">
        <Button h="1.75rem" size="sm" onClick={handleClickSearchBtn}>
          <Icon as={HiSearch} color="#333" boxSize="1.5em" />
        </Button>
      </InputRightElement>
    </InputGroup>
  );
}

export default Search;
