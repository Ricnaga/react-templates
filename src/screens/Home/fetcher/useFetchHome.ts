import { useEffect, useState } from 'react';

import { useAxiosGet } from '@application/api/axios/useAxios';

export type User = Record<'id' | 'name', string>;

export const useFetchHome = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const { callAxiosGet, data, status } = useAxiosGet<Array<User>>({
    url: '/user',
  });

  const getUsers = async () => {
    setIsLoading(true);
    return callAxiosGet().then(() => setIsLoading(false));
  };

  useEffect(() => {
    getUsers();
  }, []);

  return {
    data,
    status,
    getUsers,
  };
};
