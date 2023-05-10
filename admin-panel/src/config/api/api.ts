import axios, { AxiosInstance, AxiosRequestConfig } from "axios";
const axiosParams = {
  baseURL: "http://localhost:3001/v1/",
  headers: {
    "Content-Type": "application/json",
  },
};

// process.env.NODE_ENV === "development" ? "http://localhost:3001/v1/" : "/",

const axiosInstance = axios.create(axiosParams);

axiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("accToken");

    if (token) {
      config.headers["Authorization"] = `Bearer ${token}`;
    }
    return config;
  },
  (err) => {
    return Promise.reject(err);
  }
);

// const withLogger = async <T>(Promise: AxiosPromise<T>) => promise.catch((error:ApiError));

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
