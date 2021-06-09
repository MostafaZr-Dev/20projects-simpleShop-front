import { Button } from "@chakra-ui/button";
import Icon from "@chakra-ui/icon";
import { Box, Flex } from "@chakra-ui/layout";
import Image from "next/image";
import ImageGallery from "react-image-gallery";
import "react-image-gallery/styles/css/image-gallery.css";
import { HiArrowLeft, HiArrowRight } from "react-icons/hi";

const imageLoader = ({ src, width, quality }) => {
  return `${src}`;
};

const LeftNav = (onClick, disabled) => {
  return (
    <Button
      onClick={onClick}
      disabled={disabled}
      position="absolute"
      top="50%"
      right="5px"
      transform="translateY(-20px)"
      zIndex={4}
      backgroundColor="#fff"
    >
      <Icon as={HiArrowLeft} />
    </Button>
  );
};

const RightNav = (onClick, disabled) => {
  return (
    <Button
      onClick={onClick}
      disabled={disabled}
      position="absolute"
      top="50%"
      left="5px"
      transform="translateY(-20px)"
      zIndex={4}
      backgroundColor="#fff"
    >
      <Icon as={HiArrowRight} />
    </Button>
  );
};

const renderSliderItem = (items) => {
  return (
    <Box w="100%" h="400px" position="relative">
      <Image loader={imageLoader} layout="fill" src={items.original} />
    </Box>
  );
};

function SliderImage({ images }) {
  const sliderImages = images.map((image) => ({
    thumbnail: image.path,
    original: image.path,
  }));

  return (
    <Flex w="100%" direction="row">
      <ImageGallery
        items={sliderImages}
        isRTL={true}
        showFullscreenButton={false}
        showPlayButton={false}
        renderLeftNav={LeftNav}
        renderRightNav={RightNav}
        renderItem={renderSliderItem}
        additionalClass="slider__image"
      />
    </Flex>
  );
}

export default SliderImage;
