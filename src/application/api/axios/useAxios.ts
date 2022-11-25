import { AxiosRequestConfig } from "axios"
import { api } from "."

type AxiosParams<T extends unknown = Record<'data', symbol>> = Partial<{
    config: AxiosRequestConfig
    bodyData: T
}> & {
    url: string;
}

export const useAxios = () => {

    const callEndpointGET = async <T>({ url, config }: AxiosParams) =>
        api.get<T>(url, config)

    const callEndpointDELETE = async <
        T extends Record<'data', T | null>
    >({ url, config }: AxiosParams) =>
        api.delete<any, T>(url, config)

    const callEndpointPOST = async <
        T extends Record<'data', T | null>,
        V extends Record<symbol, unknown>
    >({ url, bodyData, config }: AxiosParams<V>) =>
        api.post<any, T, V>(url, bodyData, config)

    const callEndpointPUT = async <
        T extends Record<'data', T | null>,
        V extends Record<symbol, unknown>
    >({ url, bodyData, config }: AxiosParams<V>) =>
        api.put<any, T, V>(url, bodyData, config)

    const callEndpointPATCH = async <
        T extends Record<'data', T | null>,
        V extends Record<symbol, unknown>
    >({ url, bodyData, config }: AxiosParams<V>) =>
        api.patch<any, T, V>(url, bodyData, config)

    return {
        functions: {
            callEndpointGET,
            callEndpointDELETE,
            callEndpointPOST,
            callEndpointPUT,
            callEndpointPATCH
        }
    }
}