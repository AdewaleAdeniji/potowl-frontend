import { Tabs, TabList, TabPanels, Tab, TabPanel, Box } from "@chakra-ui/react";
import PageLayout from "../../components/layouts/PageLayout";
import NumbersList from "../../components/NumbersList";
import AddNumber from "../../components/AddNumber";
import { useState } from "react";
import UpdateNumber from "../../components/UpdateNumber";

const AdminPage = () => {
const [tabIndex, setTabIndex] = useState(0)

const handleTabsChange = (index) => {
    setTabIndex(index)
  }
  return (
    <PageLayout>
      <Box width={"90%"} mt="20" ml="5">
        <Tabs onChange={handleTabsChange}>
          <TabList>
            <Tab>All Numbers </Tab>
            <Tab>Add a number</Tab>
            <Tab>Update Number</Tab>
          </TabList>

          <TabPanels>
            <TabPanel>
              <NumbersList tab={tabIndex}/>
            </TabPanel>
            <TabPanel>
              <AddNumber />
            </TabPanel>
            <TabPanel>
             <UpdateNumber />
            </TabPanel>
          </TabPanels>
        </Tabs>
      </Box>
    </PageLayout>
  );
};

export default AdminPage;
