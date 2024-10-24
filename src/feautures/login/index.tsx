import { Button, Card, Col, Form, Input, Row, Typography } from "antd";
import { useFormik } from "formik";
import * as Yup from "yup";

interface LoginValues {
  login: string;
  password: string;
}

export const Login = ({
  onSubmit,
  loading,
}: {
  onSubmit: (values: { login: string; password: string }) => void;
  loading: boolean;
}) => {
  const formik = useFormik<LoginValues>({
    initialValues: {
      login: "",
      password: "",
    },
    validationSchema: Yup.object().shape({
      login: Yup.string().required("Login is required"),
      password: Yup.string()
        .min(6, "Password must be at least 6 characters")
        .required("Password is required"),
    }),
    onSubmit: async (data) => {
      onSubmit(data);
    },
  });

  return (
    <Row justify="center" gutter={[16, 16]}>
      <Col xs={24} sm={12} md={8}>
        <Card
          style={{
            borderRadius: 12,
            boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
          }}
        >
          <Typography.Title level={3} style={{ textAlign: "center" }}>
            Login
          </Typography.Title>

          <Form layout="vertical" onFinish={formik.handleSubmit}>
            <Form.Item
              label="Login"
              validateStatus={formik.errors.login ? "error" : ""}
              help={formik.errors.login}
            >
              <Input
                name="login"
                placeholder="Enter your login"
                size="large"
                value={formik.values.login}
                onChange={formik.handleChange}
              />
            </Form.Item>

            <Form.Item
              label="Password"
              validateStatus={formik.errors.password ? "error" : ""}
              help={formik.errors.password}
            >
              <Input.Password
                name="password"
                placeholder="Enter your password"
                size="large"
                value={formik.values.password}
                onChange={formik.handleChange}
              />
            </Form.Item>

            <Button
              type="primary"
              htmlType="submit"
              block
              disabled={loading}
              loading={loading}
              size="large"
              style={{ borderRadius: 8, marginTop: 16 }}
            >
              Login
            </Button>
          </Form>
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
  );
};
