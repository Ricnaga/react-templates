import axios from "axios";

const api = axios.create({
    baseURL: "http://localhost:8000"
})

export const endpointGET = async (url: string) => api.get(url)
    .then(({ data }) => data)
    .catch(error => console.log('Erro ao realizada a chamada ao backend', error));

export const endpointPUT = async (url: string) => api.put(url)
    .then(({ data }) => data)
    .catch(error => console.log('Erro ao realizada a chamada ao backend', error));

export const endpointPATCH = async (url: string) => api.patch(url)
    .then(({ data }) => data)
    .catch(error => console.log('Erro ao realizada a chamada ao backend', error));

export const endpointPOST = async (url: string) => api.post(url)
    .then(({ data }) => data)
    .catch(error => console.log('Erro ao realizada a chamada ao backend', error));

export const endpointDELETE = async (url: string) => api.delete(url)
    .then(({ data }) => data)
    .catch(error => console.log('Erro ao realizada a chamada ao backend', error));
