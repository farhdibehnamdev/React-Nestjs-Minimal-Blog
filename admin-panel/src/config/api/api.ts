import axios, { AxiosInstance, AxiosRequestConfig } from "axios";

import {
  requestInterceptor,
  requestInterceptorError,
  responseInterceptor,
  responseInterceptorError,
} from "src/config/interceptors/interceptors";
const axiosParams = {
  baseURL: "http://localhost:3001/v1/",
  headers: {
    "Content-Type": "application/json",
  },
  // process.env.NODE_ENV === "development" ? "http://localhost:3001/v1/" : "/",
};

export const axiosInstance = axios.create(axiosParams);

axiosInstance.interceptors.request.use(
  requestInterceptor,
  requestInterceptorError
);
axiosInstance.interceptors.response.use(
  responseInterceptor,
  responseInterceptorError
);

const api = (axios: AxiosInstance) => {
  return {
    get: <T>(url: string, config: AxiosRequestConfig = {}) =>
      axios.get<T>(url, config),
    delete: <T>(url: string, config: AxiosRequestConfig = {}) =>
      axios.delete<T>(url, config),
    post: <T>(url: string, body: unknown, config: AxiosRequestConfig = {}) =>
      axios.post<T>(url, body, config),
    patch: <T>(url: string, body: unknown, config: AxiosRequestConfig = {}) =>
      axios.patch<T>(url, body, config),
    put: <T>(url: string, body: unknown, config: AxiosRequestConfig = {}) =>
      axios.put<T>(url, body, config),
  };
};

export default api(axiosInstance);
