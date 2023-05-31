import { useState } from 'react';

import {
  TabList as ChakraTabList,
  Tab,
  TabPanel,
  TabPanels,
  Tabs,
} from '@chakra-ui/react';

import { TreatmentContainer } from '@shared/components/TreatmentContainer/TreatmentContainer';

import { TabCreate } from './components/TabCreate/TabCreate';
import { TabList } from './components/TabList/TabList';
import { TabListLoading } from './components/TabListLoading';
import { useFetchHome } from './fetcher/useFetchHome';

enum TabTitle {
  LIST = 'List',
  CREATE = 'Create',
}

export function Home() {
  const { data, getUsers, status } = useFetchHome();
  const [tabIndex, setTabIndex] = useState<number>(0);

  const userTabs = [
    {
      title: TabTitle.LIST,
      component: (
        <TreatmentContainer
          data={data}
          status={status}
          loadingCard={<TabListLoading />}
        >
          {(users) => <TabList users={users} onRefetchUsers={getUsers} />}
        </TreatmentContainer>
      ),
    },
    {
      title: TabTitle.CREATE,
      component: <TabCreate handleUpdateUsers={getUsers} />,
    },
  ];

  return (
    <Tabs isFitted onChange={(index: number) => setTabIndex(index)}>
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
