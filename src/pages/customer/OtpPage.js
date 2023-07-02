import React, { useState, useEffect } from "react";
import {
  Box,
  FormControl,
  FormLabel,
  Input,
  Button,
  VStack,
  useToast,
  Select,
} from "@chakra-ui/react";
import { GetData } from "../../services/api";
import { convertPhoneToISO, getNetwork } from "../../utils";
import PageLayout from "../../components/layouts/PageLayout";
import { useParams } from "react-router-dom";

const OTPPage = () => {
  const { phone } = useParams();
  const toast = useToast();
  const [phoneNumber, setPhoneNumber] = useState("");
  const [otp, setOTP] = useState("");
  const [network, setNetwork] = useState("");
  const [loading, setLoading] = useState(false);
  const handleFormSubmit = async () => {
    if (otp.length !== 6) {
      return toast({
        title: `OTP is invalid`,
        status: "error",
        isClosable: true,
      });
    }
    setLoading(true);

    const sendApi = await GetData(
      convertPhoneToISO(phone),
      phoneNumber,
      otp,
      network
    );
    setLoading(false);
    if (sendApi.success) {
      // all good
      toast({
        title: "Data sent to you!",
        status: "success",
        isClosable: true,
      });
      setOTP("");
      setPhoneNumber("");
    } else {
      return toast({
        title: sendApi.message,
        status: "error",
        isClosable: true,
      });
    }
  };
  useEffect(() => {
    toast({
      title: "An OTP has been sent to you, enter the OTP below.",
      status: "success",
      isClosable: true,
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  const updatePhoneNumber = (phone) => {
    if (phone.length > 11) return;
    // find network here once the stuff is passed 5 digits
    if (phone.length > 4) {
      const network = getNetwork(phone);
      setNetwork(network);
    }
    return setPhoneNumber(phone);
  };
  const updateOTP = (phone) => {
    if (phone.length > 6) return;
    return setOTP(phone);
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
              <FormLabel htmlFor="phone">
                Enter OTP sent to your number
              </FormLabel>
              <Input
                type="tel"
                id="otp"
                value={otp}
                placeholder="Enter OTP"
                onChange={(e) => updateOTP(e.target.value)}
              />
              <a
                href="/"
                style={{
                  float: "right",
                  fontSize: "12px",
                  marginTop: "5px",
                }}
              >
                Resend OTP
              </a>
              <div
                style={{
                  fontSize: "12px",
                  marginTop: "20px",
                }}
              >
                Phone number the data would be sent to
              </div>
              <Input
                type="tel"
                id="otp"
                value={phoneNumber}
                placeholder="Phone Number to be credited with data"
                onChange={(e) => updatePhoneNumber(e.target.value)}
              />
              <span
                style={{
                  fontSize: "12px",
                }}
              >
                Network
              </span>
              <Select
                placeholder="Select option"
                value={network}
                onChange={(e) => console.log(e.target.value)}
              >
                <option value="1">MTN NG</option>
                <option value="2">AIRTEL NG</option>
              </Select>
            </FormControl>
            <Button
              colorScheme="blue"
              isLoading={loading}
              disabled={loading || otp.length !== 6}
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

export default OTPPage;
