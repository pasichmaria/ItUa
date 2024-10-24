import { createFileRoute } from "@tanstack/react-router";
import { useAuth } from "../../../core";
import { Login } from "../../../feautures";

export const Route = createFileRoute("/auth/login/")({
  component: LoginComponent,
});

function LoginComponent() {
  const { login, loading } = useAuth();

  return <Login onSubmit={login} loading={loading} />;
}
