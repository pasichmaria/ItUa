import { CloseOutlined } from "@ant-design/icons";
import { Button, Col, Input, Row, Typography } from "antd";
import { useFormik } from "formik";

const { Title } = Typography;

export interface FilterFormProps {
  open: boolean;
  handleCloseFilter: () => void;
  onFilterChange: (values: Partial<FilterValues>) => void;
}

interface FilterValues {
  name: string;
  lastName: string;
  position: string;
  email: string;
}

export const Filter = ({
  open,
  handleCloseFilter,
  onFilterChange,
}: FilterFormProps) => {
  const formik = useFormik<FilterValues>({
    initialValues: { name: "", lastName: "", position: "", email: "" },
    onSubmit: () => {},
  });

  const resetForm = () => {
    formik.resetForm();
    onFilterChange({});
    handleCloseFilter();
  };

  return (
    <div
      style={{
        position: "fixed",
        top: 0,
        right: open ? 0 : "-240px",
        width: "240px",
        height: "100%",
        backgroundColor: "#fff",
        boxShadow: "0 0 10px rgba(0, 0, 0, 0.1)",
        transition: "right 0.3s ease",
        zIndex: 1000,
        padding: "24px",
      }}
    >
      <Row justify="space-between">
        <Title level={4}>Фільтр</Title>
        <Button
          icon={<CloseOutlined />}
          onClick={handleCloseFilter}
          type="text"
        />
      </Row>
      <form style={{ gap: "28px", display: "flex", flexDirection: "column" }}>
        <Input
          placeholder="Ім'я"
          name="name"
          onChange={formik.handleChange}
          value={formik.values.name}
          size="large"
        />
        <Input
          placeholder="Прізвище"
          name="lastName"
          onChange={formik.handleChange}
          value={formik.values.lastName}
          size="large"
        />
        <Input
          placeholder="Посада"
          name="position"
          onChange={formik.handleChange}
          value={formik.values.position}
          size="large"
        />
        <Input
          placeholder="E-mail"
          name="email"
          onChange={formik.handleChange}
          value={formik.values.email}
          size="large"
        />
        <Row gutter={16}>
          <Col span={12}>
            <Button type="default" block onClick={resetForm}>
              Очистити
            </Button>
          </Col>
          <Col span={12}>
            <Button
              type="primary"
              block
              onClick={() => onFilterChange(formik.values)}
            >
              Фільтрувати
            </Button>
          </Col>
        </Row>
      </form>
    </div>
  );
};
