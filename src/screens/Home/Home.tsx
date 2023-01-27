import { useAxios } from '@application/api/axios/useAxios';
import {
  Tab,
  TabList as ChakraTabList,
  TabPanel,
  TabPanels,
  Tabs,
} from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import { TabCreate } from './components/TabCreate';
import { TabList } from './components/TabList';

enum TabTitle {
  LIST = 'List',
  CREATE = 'Create',
}

export type User = Record<'id' | 'name', string>;

export function HomeScreen() {
  const {
    functions: { callGET },
  } = useAxios();
  const [tabIndex, setTabIndex] = useState(0);
  const [users, setUsers] = useState<Array<User>>([]);

  const getUsers = async () => callGET<Array<User>>({ url: '/user' });

  useEffect(() => {
    getUsers().then((response) => setUsers(response.data));
  }, []);

  const userTabs = [
    { title: TabTitle.LIST, component: <TabList users={users} /> },
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
