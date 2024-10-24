import { type ReactNode, createContext, useEffect, useState } from "react";
import { container } from "tsyringe";

import { AuthService } from "./AuthService";
import { DepartmentsService } from "./DepartmentsService";
import { UsersService } from "./UsersService";

interface Services {
  authService: AuthService;
  usersService: UsersService;
  departmentsService: DepartmentsService;
}

interface ServicesProviderProps {
  children: ReactNode;
}

export const ServicesContext = createContext<Services | null>(null);

export const ServicesProvider = ({ children }: ServicesProviderProps) => {
  const [services, setServices] = useState<Services | null>(null);

  useEffect(() => {
    const authService = container.resolve(AuthService);
    const usersService = container.resolve(UsersService);
    const departmentsService = container.resolve(DepartmentsService);

    setServices({ authService, usersService, departmentsService });
  }, []);

  if (!services) return null;

  return (
    <ServicesContext.Provider value={services}>
      {children}
    </ServicesContext.Provider>
  );
};
