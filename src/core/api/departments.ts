import type { Department } from "../interfaces";
import { axios } from "./axios";

export const getDepartments = async () => {
  return axios
    .get("/company/departments")
    .then<Department[]>((res) => res.data["hydra:member"]);
};

export const getDepartment = async (id: number) => {
  return axios
    .get(`/company/departments/${id}`)
    .then<Department | null>((res) => res.data);
};
