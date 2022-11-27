import { AxiosRequestConfig } from 'axios';
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
  const callEndpointGET = async <T>({ url, config }: AxiosParams) =>
    api.get<T>(url, config);

  const callEndpointDELETE = async <T extends Record<'data', T | null>>({
    url,
    config,
  }: AxiosParams) => api.delete<unknown, T>(url, config);

  const callEndpointPOST = async <
    T extends Record<'data', T | null>,
    V extends Record<symbol, unknown>,
  >({
    url,
    bodyData,
    config,
  }: AxiosParams<V>) => api.post<unknown, T, V>(url, bodyData, config);

  const callEndpointPUT = async <
    T extends Record<'data', T | null>,
    V extends Record<symbol, unknown>,
  >({
    url,
    bodyData,
    config,
  }: AxiosParams<V>) => api.put<unknown, T, V>(url, bodyData, config);

  const callEndpointPATCH = async <
    T extends Record<'data', T | null>,
    V extends Record<symbol, unknown>,
  >({
    url,
    bodyData,
    config,
  }: AxiosParams<V>) => api.patch<unknown, T, V>(url, bodyData, config);

  return {
    functions: {
      callEndpointGET,
      callEndpointDELETE,
      callEndpointPOST,
      callEndpointPUT,
      callEndpointPATCH,
    },
  };
};
