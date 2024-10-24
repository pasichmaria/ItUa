import type { User } from "../interfaces";
import { axios } from "./axios";

export const getUsers = async () => {
  return await axios
    .get("/company/users")
    .then<User[]>((res) => res.data["hydra:member"]);
};
