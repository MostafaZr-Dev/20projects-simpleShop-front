import { useEffect, useState } from "react";
import { Box, Progress } from "@chakra-ui/react";
import { useRouter } from "next/router";

function Loader() {
  const [open, setOpen] = useState(false);

  const router = useRouter();

  useEffect(() => {
    let routeChangeStart = () => setOpen(true);
    let routeChangeComplete = () => setOpen(false);

    router.events.on("routeChangeStart", routeChangeStart);
    router.events.on("routeChangeComplete", routeChangeComplete);
    router.events.on("routeChangeError", routeChangeComplete);

    return () => {
      router.events.off("routeChangeStart", routeChangeStart);
      router.events.off("routeChangeComplete", routeChangeComplete);
      router.events.off("routeChangeError", routeChangeComplete);
    };
  }, []);

  return (
    <>
      {open && (
        <Box w="full" position="fixed" top="0">
          <Progress size="xs" isIndeterminate colorScheme="pink" />
        </Box>
      )}
    </>
  );
}

export default Loader;
