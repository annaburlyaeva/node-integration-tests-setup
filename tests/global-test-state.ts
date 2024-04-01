import axios, { AxiosRequestConfig, AxiosResponse } from "axios"

const apiUrl = (globalThis as any).TEST_API_URL

const getRequest = async (path: string, customHeaders?: any): Promise<AxiosResponse> => {
  let headers: AxiosRequestConfig<any> | undefined = undefined
  if (customHeaders) {
    headers = customHeaders
  }
  return await axios.get(`${apiUrl}${path}`, headers)
}

const deleteRequest = async (
  path: string,
  customHeaders?: any
): Promise<AxiosResponse> => {
  let headers: AxiosRequestConfig<any> | undefined = undefined
  if (customHeaders) {
    headers = customHeaders
  }
  return await axios.delete(`${apiUrl}${path}`, headers)
}

const postRequest = async (
  path: string,
  body: any,
  customHeaders?: any,
): Promise<AxiosResponse> => {
  let headers: AxiosRequestConfig<any> | undefined = undefined
  if (customHeaders) {
    headers = customHeaders
  }
  return await axios.post(`${apiUrl}${path}`, body, headers)
}

const putRequest = async (
  path: string,
  body: any,
  customHeaders?: any
): Promise<AxiosResponse> => {
  let headers: AxiosRequestConfig<any> | undefined = undefined
  if (customHeaders) {
    headers = customHeaders
  }
  return await axios.put(`${apiUrl}${path}`, body, headers)
}

export const testApiClient = {
  post: postRequest,
  get: getRequest,
  delete: deleteRequest,
  put: putRequest,
}
