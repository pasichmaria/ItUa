import { Link, createFileRoute } from "@tanstack/react-router";
import { Button, Card, Col, List, Row, Spin, Typography } from "antd";
import { Content } from "antd/es/layout/layout";

import { useAuth } from "../core";

export const Route = createFileRoute("/")({
  component: Home,
});

function Home() {
  const { loading } = useAuth();

  if (loading) {
    return <Spin />;
  }

  return (
    <Content
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Row gutter={[16, 16]} justify="center">
        <Col xs={24} sm={12} md={8}>
          <Card
            bordered
            style={{
              borderRadius: 12,
              backgroundColor: "rgba(33,89,173,0.21)",
              boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
            }}
          >
            <Typography.Title level={4}>Technologies Used</Typography.Title>
            <List size="small">
              <List.Item>React</List.Item>
              <List.Item>TanStack Router</List.Item>
              <List.Item>RxJs</List.Item>
              <List.Item>Ant Design</List.Item>
              <List.Item>SWC</List.Item>
            </List>
            <Row
              gutter={[16, 16]}
              justify="space-between"
              style={{ marginTop: 16 }}
            >
              <Col xs={24} sm={12}>
                <Link to="/users">
                  <Button block type="primary">
                    Users
                  </Button>
                </Link>
              </Col>
              <Col xs={24} sm={12}>
                <Link to="/departments">
                  <Button block type="primary">
                    Departments
                  </Button>
                </Link>
              </Col>
            </Row>
          </Card>
        </Col>

        <Col xs={24} sm={12} md={8}>
          <Card
            bordered
            style={{
              borderRadius: 12,
              boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
            }}
          >
            <Typography.Title level={3}>Project Overview</Typography.Title>
            <Typography.Paragraph>
              This project demonstrates a simple authentication flow using
              TanStack Router and TypeScript (SWC), with Ant Design for UI
              components and RxJs for state management.
            </Typography.Paragraph>

            <Typography.Paragraph>
              <strong>Admin Login Credentials:</strong>
              <br /> Email: <code>front</code>
              <br /> Password: <code>12345678</code>
            </Typography.Paragraph>
          </Card>
        </Col>
      </Row>
    </Content>
  );
}
