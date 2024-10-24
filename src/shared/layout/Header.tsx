import { Link } from "@tanstack/react-router";
import { Button, Col, Row } from "antd";
import { Header as HeaderLib } from "antd/es/layout/layout";

export const Header = ({
  logout,
  isAuthenticated,
}: {
  logout: () => void;
  isAuthenticated: boolean;
}) => {
  return (
    <HeaderLib>
      {isAuthenticated ? (
        <Row gutter={16} style={{ alignItems: "center" }}>
          <Link to="/users">
            <Button type="primary">Users</Button>
          </Link>
          <Col>
            <Link to="/departments">
              <Button type="primary">Departments</Button>
            </Link>
          </Col>
          <Col>
            <Button type="dashed" onClick={logout}>
              Logout
            </Button>
          </Col>
        </Row>
      ) : (
        <Row gutter={16} align="middle">
          <Link to="/auth/login">
            <Button type="primary">Login</Button>
          </Link>
        </Row>
      )}
    </HeaderLib>
  );
};
