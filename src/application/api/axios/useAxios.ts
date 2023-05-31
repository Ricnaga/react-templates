import { useState } from 'react';

import { AxiosError, AxiosRequestConfig } from 'axios';

import { api } from '.';

type AxiosParams<
  T extends Record<string, string | symbol | null> = Record<
    'data',
    symbol | null
  >,
> = Partial<{
  config: AxiosRequestConfig;
  bodyData: T;
}> & {
  url: string;
};

export const useAxios = () => {
  const callGET = async <T>({ url, config }: Omit<AxiosParams, 'bodyData'>) =>
    api.get<T>(url, config);

  const callDELETE = async <T extends Record<'data', T | unknown>>({
    url,
    config,
  }: AxiosParams) => api.delete<unknown, T>(url, config);

  const callPOST = async <
    T extends Record<'data', T | unknown>,
    V extends Record<symbol, unknown>,
  >({
    url,
    bodyData,
    config,
  }: AxiosParams<V>) => api.post<unknown, T, V>(url, bodyData, config);

  const callPUT = async <
    T extends Record<'data', T | unknown>,
    V extends Record<symbol, unknown>,
  >({
    url,
    bodyData,
    config,
  }: AxiosParams<V>) => api.put<unknown, T, V>(url, bodyData, config);

  const callPATCH = async <
    T extends Record<'data', T | unknown>,
    V extends Record<symbol, unknown>,
  >({
    url,
    bodyData,
    config,
  }: AxiosParams<V>) => api.patch<unknown, T, V>(url, bodyData, config);

  return {
    functions: {
      callGET,
      callDELETE,
      callPOST,
      callPUT,
      callPATCH,
    },
  };
};

export enum RequestStatus {
  IDLE = 'IDLE',
  PENDING = 'PENDING',
  FAIL = 'FAIL',
  DONE = 'DONE',
}

export const useAxiosGet = <T>({
  url,
  config,
}: Omit<AxiosParams, 'bodyData'>) => {
  const [status, setStatus] = useState<keyof typeof RequestStatus>('IDLE');
  const [data, setData] = useState<T | undefined>();

  const callAxiosGet = async () => {
    setStatus('PENDING');

    try {
      const response = await api.get<T>(url, config);
      setStatus('DONE');
      setData(response.data);
    } catch (error) {
      setStatus('FAIL');
      throw Error('Erro, não foi possível receber dados do backend');
    }
  };

  return {
    callAxiosGet,
    status,
    data,
  };
};
