import { useContext } from "react";
import "reflect-metadata";

import { ServicesContext } from "../services";

export const useServices = () => {
  const context = useContext(ServicesContext);

  if (!context) {
    throw new Error("Forgot to wrap component in ServicesProvider");
  }
  return context;
};
