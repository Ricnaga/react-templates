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
  const callGETMethod = async <T>({
    url,
    config,
  }: Omit<AxiosParams, 'bodyData'>) => api.get<T>(url, config);

  const callDELETEMethod = async <T extends Record<'data', T | null>>({
    url,
    config,
  }: AxiosParams) => api.delete<unknown, T>(url, config);

  const callPOSTMethod = async <
    T extends Record<'data', T | null>,
    V extends Record<symbol, unknown>,
  >({
    url,
    bodyData,
    config,
  }: AxiosParams<V>) => api.post<unknown, T, V>(url, bodyData, config);

  const callPUTMethod = async <
    T extends Record<'data', T | null>,
    V extends Record<symbol, unknown>,
  >({
    url,
    bodyData,
    config,
  }: AxiosParams<V>) => api.put<unknown, T, V>(url, bodyData, config);

  const callPATCHMethod = async <
    T extends Record<'data', T | null>,
    V extends Record<symbol, unknown>,
  >({
    url,
    bodyData,
    config,
  }: AxiosParams<V>) => api.patch<unknown, T, V>(url, bodyData, config);

  return {
    functions: {
      callGETMethod,
      callDELETEMethod,
      callPOSTMethod,
      callPUTMethod,
      callPATCHMethod,
    },
  };
};
