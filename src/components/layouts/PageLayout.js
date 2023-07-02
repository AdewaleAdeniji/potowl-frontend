import React from "react";
import { ChakraProvider, Box, Heading, Text, Spacer } from "@chakra-ui/react";

const PageLayout = ({ children }) => {
  return (
    <ChakraProvider>
      <Box minHeight="100vh" display="flex" flexDirection="column">
        <Box bg="blue.500" py={4} px={8} position="fixed" top={0} width="100%">
          <Heading size="small" color="white">
            DataLeum
          </Heading>
        </Box>
        {children}
        <Spacer />
        <Box
          bg="gray.200"
          py={4}
          px={8}
          textAlign="center"
          borderTop="1px"
          borderColor="gray.400"
        >
          <Text>Built by Feranmi</Text>
        </Box>
      </Box>
    </ChakraProvider>
  );
};

export default PageLayout;
