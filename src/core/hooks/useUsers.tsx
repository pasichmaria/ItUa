import { useEffect, useState } from "react";

import { useServices } from "../../core/hooks";
import type { User } from "../interfaces";

export const useUsers = () => {
  const { usersService } = useServices();
  const [users, setUsers] = useState<User[]>([]);
  const [filteredUsers, setFilteredUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    usersService.getUsers();
    const subscription = usersService.users$.subscribe({
      next: (data) => {
        setUsers(data);
        setFilteredUsers(data);
        setLoading(false);
      },
      error: () => {
        setLoading(false);
      },
    });

    return () => subscription.unsubscribe();
  }, [usersService]);

  const applyUsersFilter = (values: Partial<Record<keyof User, string>>) => {
    setFilteredUsers(
      users.filter((user) =>
        Object.entries(values).every(([key, value]) => {
          const field = user[key as keyof User];
          if (typeof field === "string" && value) {
            return field.toLowerCase().includes(value.toLowerCase());
          }
          return !value;
        }),
      ),
    );
  };

  return { users: filteredUsers, loading, applyUsersFilter };
};
