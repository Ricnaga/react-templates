import {
  Tab,
  TabList as ChakraTabList,
  TabPanel,
  TabPanels,
  Tabs,
} from '@chakra-ui/react';
import { useState } from 'react';
import { TabCreate } from './components/TabCreate';
import { TabList } from './components/TabList';

enum TabTitle {
  LIST = 'List',
  CREATE = 'Create',
}

export function HomeScreen() {
  const [tabIndex, setTabIndex] = useState(0);

  const userTabs = [
    { title: TabTitle.LIST, component: <TabList /> },
    { title: TabTitle.CREATE, component: <TabCreate /> },
  ];

  return (
    <Tabs isFitted onChange={(index) => setTabIndex(index)}>
      <ChakraTabList>
        {userTabs.map(({ title }) => (
          <Tab key={title}>{title}</Tab>
        ))}
      </ChakraTabList>

      <TabPanels>
        {userTabs.map(({ component, title }) => (
          <TabPanel key={title}>{component}</TabPanel>
        ))}
      </TabPanels>
    </Tabs>
  );
}
