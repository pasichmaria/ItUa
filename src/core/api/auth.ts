import { axios } from "./axios";

interface LoginResponse {
  token: string;
  refresh_token: string;
  error?: string;
}

export const login = async (data: { login: string; password: string }) => {
  return axios.post<LoginResponse>("/auth/login", data).then((res) => res.data);
};

export const refreshToken = async () => {
  const refreshToken = sessionStorage.getItem("refreshToken");
  return axios
    .post<LoginResponse>("/auth/refresh_token", {
      refresh_token: refreshToken,
    })
    .then((res) => res.data);
};
