import axioslib from "axios";

import { refreshToken } from "./auth";

export const axios = axioslib.create({
  baseURL: "https://demo2-uk.prod.itua.in.ua/core_api",
  withCredentials: false,
});

export const setToken = (token: string, refreshToken?: string) => {
  sessionStorage.setItem("token", token);
  if (refreshToken) sessionStorage.setItem("refreshToken", refreshToken);
};

export const removeToken = () => {
  sessionStorage.clear();
};

axios.interceptors.request.use(
  (config) => {
    const token = sessionStorage.getItem("token");
    if (token) config.headers.Authorization = `Bearer ${token}`;
    return config;
  },
  (error) => Promise.reject(error),
);

axios.interceptors.response.use(
  (response) => response,
  async (error) => {
    if (error.response?.status === 401) {
      const storageToken = sessionStorage.getItem("refreshToken");
      if (storageToken) {
        try {
          const { token } = await refreshToken();
          setToken(token);
          error.config.headers.Authorization = `Bearer ${token}`;
          return axios.request(error.config);
        } catch (_e) {
          removeToken();
        }
      }
    }
    return Promise.reject(error);
  },
);
