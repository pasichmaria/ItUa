import { Outlet, createRootRoute } from "@tanstack/react-router";
import { useAuth } from "../core";
import { Layout } from "../shared/layout";

export const Route = createRootRoute({
  component: RootComponent,
});

function RootComponent() {
  const { isAuthenticated, logout } = useAuth();

  return (
    <Layout logout={logout} isAuthenticated={isAuthenticated}>
      <Outlet />
    </Layout>
  );
}
