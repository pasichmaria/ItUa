import { Layout as LayoutLib } from "antd";
import type React from "react";

import { Header } from "./Header";

interface Props {
  children: React.ReactNode;
  logout: () => void;
  isAuthenticated: boolean;
}

export const Layout = ({ children, logout, isAuthenticated }: Props) => {
  return (
    <LayoutLib style={{ minHeight: "100vh" }}>
      <Header logout={logout} isAuthenticated={isAuthenticated} />
      <LayoutLib.Content
        style={{
          padding: "24px",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          flexDirection: "column",
        }}
      >
        {children}
      </LayoutLib.Content>
      <LayoutLib.Footer style={{ textAlign: "center" }}>
        created by <a href="https://t.me/Blueremelka">pasichmaria</a>
      </LayoutLib.Footer>
    </LayoutLib>
  );
};
