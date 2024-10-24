import { createFileRoute, useRouter } from "@tanstack/react-router";

import { useEffect } from "react";
import { useAuth, useDepartments } from "../../core";
import { useDepartment } from "../../core";
import { Departments } from "../../feautures";

export const Route = createFileRoute("/departments/")({
  component: DepartmentsComponent,
});

function DepartmentsComponent() {
  const { isAuthenticated } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!isAuthenticated) {
      router.navigate({ to: "/auth/login" });
    }
  }, [isAuthenticated, router]);

  const { departments, loading: departmentsLoading } = useDepartments();
  const {
    department,
    getDepartment,
    clearDepartment,
    loading: departmentLoading,
  } = useDepartment();

  return (
    <Departments
      departments={departments}
      departmentsLoading={departmentsLoading}
      department={department}
      getDepartment={getDepartment}
      departmentLoading={departmentLoading}
      clearDepartment={clearDepartment}
    />
  );
}
