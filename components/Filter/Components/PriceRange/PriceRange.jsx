import { useState } from "react";
import {
  Box,
  Slider,
  SliderFilledTrack,
  SliderThumb,
  SliderTrack,
  Text,
} from "@chakra-ui/react";
import { Stack } from "@chakra-ui/layout";
import { formatToman } from "services/crrencyService";

function PriceRange({ maxPrice, defaultPrice, onMinChange, onMaxCahnge }) {
  const [maxPriceValue, setMaxPriceValue] = useState(
    defaultPrice.max ? defaultPrice.max : maxPrice
  );

  const handleChangeMaxPrice = (value) => {
    setMaxPriceValue(value);

    onMaxCahnge(value);
  };

  const handleChangeMinPrice = (value) => {
    onMinChange(value);
  };

  const defaultMin = defaultPrice.min ? defaultPrice.min : 0;
  const defaultMax = defaultPrice.max ? defaultPrice.max : maxPrice;

  return (
    <Stack direction="column" w="full">
      <Box>
        <Text>از ({formatToman(defaultMin)})</Text>
        <Slider
          aria-label="slider-ex-3"
          name="slider-min"
          defaultValue={defaultMin}
          min={0}
          max={maxPriceValue}
          onChangeEnd={handleChangeMinPrice}
        >
          <SliderTrack bg="red.100">
            <SliderFilledTrack bg="tomato" />
          </SliderTrack>
          <SliderThumb boxSize={6}>
            <Box color="tomato" />
          </SliderThumb>
        </Slider>
      </Box>
      <Box>
        <Text>تا ({formatToman(defaultMax)})</Text>
        <Slider
          aria-label="slider-ex-4"
          name="slider-max"
          defaultValue={defaultMax}
          onChange={(value) => console.log(value)}
          min={0}
          max={maxPrice}
          onChangeEnd={handleChangeMaxPrice}
        >
          <SliderTrack bg="red.100">
            <SliderFilledTrack bg="tomato" />
          </SliderTrack>
          <SliderThumb boxSize={6}>
            <Box color="tomato" />
          </SliderThumb>
        </Slider>
      </Box>
    </Stack>
  );
}

export default PriceRange;
