import { AxiosResponse, InternalAxiosRequestConfig } from "axios";
import { axiosInstance } from "../api/api";

export async function refreshToken() {
  try {
    const response = await axiosInstance.post("auth/refresh-token", {
      refreshToken: localStorage.getItem("refToken"),
    });

    const newAccessToken = response.data.accessToken;
    axiosInstance.defaults.headers.common[
      "Authorization"
    ] = `Bearer \${newAccessToken}`;

    localStorage.setItem("accToken", newAccessToken);
    localStorage.setItem("refToken", response.data.refreshToken);

    return newAccessToken;
  } catch (error) {
    return Promise.reject(error);
  }
}

export const requestInterceptor = (config: InternalAxiosRequestConfig) => {
  const token = localStorage.getItem("accToken");

  if (token) {
    config.headers!.Authorization = `Bearer ${token}`;
  }
  return config;
};

export const requestInterceptorError = (err: any) => {
  return Promise.reject(err);
};

export const responseInterceptor = (response: AxiosResponse) => {
  return response;
};

export const responseInterceptorError = async (err: any) => {
  const originalRequest = err.config;
  if (err.response.status === 401 && !originalRequest._retry) {
    originalRequest._retry = true;
    await refreshToken();
  }
  return Promise.reject(err);
};
