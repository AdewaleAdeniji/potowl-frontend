import React from "react";
import {
  ChakraProvider,
  Box,
  Heading,
  Text,
  Spacer,
  Button,
} from "@chakra-ui/react";

const PageLayout = ({ children }) => {
  return (
    <ChakraProvider>
      <Box minHeight="100vh" display="flex" flexDirection="column">
        <Box
          bg="green.500"
          py={2}
          px={4}
          height={"20"}
          position="fixed"
          top={0}
          width="100%"
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems:"center"
          }}
        >
          <Heading size="small" color="white">
            PotOwls
          </Heading>
          <Button>Add PotHole</Button>
        </Box>
        <div style={{
            marginTop:"80px"
        }}>
        {children}
        </div>
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
