import { useEffect, useState } from "react";

import type { Department } from "../interfaces";
import { useServices } from "./useServices";

export const useDepartment = () => {
  const { departmentsService } = useServices();
  const [department, setDepartment] = useState<Department | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    const subscription = departmentsService.department$.subscribe({
      next: (data) => {
        setDepartment(data);
        setLoading(false);
      },
      error: () => {
        setLoading(false);
      },
    });

    return () => subscription.unsubscribe();
  }, [departmentsService]);

  const getDepartment = (id: number) => {
    setLoading(true);
    departmentsService.getDepartment(id);
  };

  return {
    department,
    loading,
    getDepartment,
    clearDepartment: () => departmentsService.clearDepartment(),
  };
};
