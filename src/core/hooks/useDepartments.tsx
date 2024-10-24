import { useEffect, useState } from "react";

import type { Department } from "../interfaces";
import { useServices } from "./useServices";

export const useDepartments = () => {
  const { departmentsService } = useServices();
  const [departments, setDepartments] = useState<Department[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    departmentsService.getDepartments();
    const subscription = departmentsService.departments$.subscribe({
      next: (data) => {
        setDepartments(data);
        setLoading(false);
      },
      error: () => {
        setLoading(false);
      },
    });

    return () => subscription.unsubscribe();
  }, [departmentsService]);

  return { departments, loading };
};
