import { createFileRoute, useRouter } from "@tanstack/react-router";

import { useEffect } from "react";
import { useAuth, useUsers } from "../../core";
import { Users } from "../../feautures";

export const Route = createFileRoute("/users/")({
  component: UsersComponent,
});

function UsersComponent() {
  const { isAuthenticated } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!isAuthenticated) {
      router.navigate({to: "/auth/login"}).then(r => console.log(r));
    }
  }, [isAuthenticated, router]);

  const { users, loading, applyUsersFilter } = useUsers();

  return (
    <Users
      users={users}
      applyUsersFilter={applyUsersFilter}
      loading={loading}
    />
  );
}
