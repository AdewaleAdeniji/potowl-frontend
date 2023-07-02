import {
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  TableCaption,
  useToast,
  TableContainer,
  Button,
} from "@chakra-ui/react";
import React from "react";
import { useParams } from "react-router-dom";
import {
  DisableNumber,
  GetListedNumbers,
  ReactivateNumber,
} from "../services/api";
import moment from "moment";

const NumbersList = ({ tab }) => {
  const toast = useToast();
  const [numbers, setNumbers] = React.useState([]);
  const { key } = useParams();
  React.useEffect(() => {
    fetchNumbers();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [tab]);
  const handleDisableNumber = async (number) => {
    const list = await DisableNumber(key, number);
    if (list.success) {
      toast({
        title: "Number disabled",
        status: "success",
        isClosable: true,
      });
      fetchNumbers();
    } else {
      toast({
        status: "error",
        title: list.message,
        isClosable: true,
      });
    }
  };
  const handleReactivateNumber = async (number) => {
    const list = await ReactivateNumber(key, number);
    if (list.success) {
      toast({
        title: "Number reactivated",
        status: "success",
        isClosable: true,
      });
      fetchNumbers();
    } else {
      toast({
        status: "error",
        title: list.message,
        isClosable: true,
      });
    }
  };
  const fetchNumbers = async () => {
    const list = await GetListedNumbers(key);
    if (list.success) {
      console.log(list.numbers);
      setNumbers(list.numbers || []);
    } else {
      toast({
        status: "error",
        title: list.message,
        isClosable: true,
      });
    }
  };
  return (
    <TableContainer>
      <Table variant="simple">
        <TableCaption>List of all Numbers</TableCaption>
        <Thead>
          <Tr>
            <Th>Number</Th>
            <Th>Allowed Times</Th>
            <Th>Last Bought</Th>
            <Th>Last Bought Amount</Th>
            <Th>Status</Th>
            <Th>---</Th>
          </Tr>
        </Thead>
        <Tbody>
          {numbers.map((num) => {
            return (
              <Tr>
                <Td>{num.number}</Td>
                <Td>{num.allowedTimes}</Td>
                <Td>{moment(num.lastBought).format("HH:mm - DD/MM/YYYY")}</Td>
                <Td>{num.lastBoughtAmount}</Td>
                <Td>{num.status ? "Active" : "Inactive"}</Td>
                <Td>
                  <Button
                    onClick={() =>
                      num.status
                        ? handleDisableNumber(num.number)
                        : handleReactivateNumber(num.number)
                    }
                  >
                    {num.status ? "Disable" : "Enable"}
                  </Button>
                </Td>
              </Tr>
            );
          })}
        </Tbody>
      </Table>
    </TableContainer>
  );
};

export default NumbersList;
