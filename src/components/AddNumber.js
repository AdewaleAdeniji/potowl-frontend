import React, { useState } from "react";
import {
  Box,
  FormControl,
  FormLabel,
  Input,
  Button,
  VStack,
  useToast,
} from "@chakra-ui/react";
import { convertPhoneToISO } from "../utils";
import PageLayout from "./layouts/PageLayout";
import { useParams } from "react-router-dom";
import { AddNumberAPI } from "../services/api";


const AddNumber = () => {
  const toast = useToast();
  const { key } = useParams();
  const [phoneNumber, setPhoneNumber] = useState("");
  const [loading, setLoading] = useState(false);
  const [username, setUsername] = useState("");

  const handleFormSubmit = async () => {
    if (phoneNumber.length !== 11) {
      return toast({
        title: `Phone Number is invalid`,
        status: "error",
        isClosable: true,
      });
    }
    setLoading(true);

    const sendApi = await AddNumberAPI(convertPhoneToISO(phoneNumber), key, username);
    setLoading(false);
    if (sendApi.success) {
      // all good
      toast({
        title: "Number added",
        status: "success",
        isClosable: true,
      });
    } else {
      return toast({
        title: sendApi.message,
        status: "error",
        isClosable: true,
      });
    }
  };
  const updatePhoneNumber = (phone) => {
    if (phone.length > 11) return;
    return setPhoneNumber(phone);
  };
  return (
    <PageLayout>
      <Box
        flex="1"
        mt={20}
        width={"100%"}
        display="flex"
        alignItems="center"
        justifyContent="center"
      >
          <Box width={"70%"}>
            <VStack spacing={4} align="stretch">
              <FormControl width="100%">
                <FormLabel htmlFor="phone">Phone Number</FormLabel>
                <Input
                  type="tel"
                  id="phone"
                  value={phoneNumber}
                  placeholder="Enter phone number e.g 08107034669"
                  onChange={(e) => updatePhoneNumber(e.target.value)}
                />
                <Input
                  mt={2}
                  type="text"
                  id="phone"
                  value={username}
                  placeholder="User name"
                  onChange={(e) => setUsername(e.target.value)}
                />
              </FormControl>
              <Button
                colorScheme="blue"
                isLoading={loading}
                disabled={loading || phoneNumber.length !== 11}
                onClick={handleFormSubmit}
              >
                Submit
              </Button>
            </VStack>
          </Box>
      </Box>
    </PageLayout>
  );
};

export default AddNumber;
