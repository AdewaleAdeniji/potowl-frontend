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
  } from "@chakra-ui/react";
  import React from "react";
  import { useParams } from "react-router-dom";
  import {
    GetTransactions,
  } from "../services/api";
  import moment from "moment";
  
  const TransactionsList = ({ tab }) => {
    const toast = useToast();
    const [transactions, setTransactions] = React.useState([]);
    const { key } = useParams();
    React.useEffect(() => {
      fetchNumbers();
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [tab]);

    const fetchNumbers = async () => {
      const list = await GetTransactions(key);
      if (list.success) {
        setTransactions(list.transactions || []);
      } else {
        toast({
          status: "error",
          title: list.message,
          isClosable: true,
        });
      }
    };
    console.log(transactions.reverse());

    return (
      <TableContainer>
        <Table variant="simple">
          <TableCaption>List of all Numbers</TableCaption>
          <Thead>
            <Tr>
              <Th>Number</Th>
              <Th>Amount</Th>
              <Th>Date</Th>
            </Tr>
          </Thead>
          <Tbody>
            {transactions.reverse().map((num) => {
              return (
                <Tr>
                  <Td>{num?.number}</Td>
                  <Td>{num?.dataAmount}</Td>
                  <Td>{moment(num?.createdAt).format("HH:mm - DD/MM/YYYY")}</Td>
                  
                </Tr>
              );
            })}
          </Tbody>
        </Table>
      </TableContainer>
    );
  };
  
  export default TransactionsList;
  