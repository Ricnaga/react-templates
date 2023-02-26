import { useEffect, useState } from 'react';

import {
  TabList as ChakraTabList,
  Tab,
  TabPanel,
  TabPanels,
  Tabs,
} from '@chakra-ui/react';

import { useAxios } from '@application/api/axios/useAxios';

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
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [users, setUsers] = useState<Array<User>>([]);

  const getUsers = async () => {
    setIsLoading(true);
    return callGET<Array<User>>({ url: '/user' })
      .then((response) => setUsers(response.data))
      .finally(() => setIsLoading(false));
  };

  useEffect(() => {
    getUsers();
  }, []);

  const userTabs = [
    {
      title: TabTitle.LIST,
      component: (
        <TabList
          users={users}
          isLoading={isLoading}
          onRefetchUsers={getUsers}
        />
      ),
    },
    {
      title: TabTitle.CREATE,
      component: <TabCreate handleUpdateUsers={getUsers} />,
    },
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
