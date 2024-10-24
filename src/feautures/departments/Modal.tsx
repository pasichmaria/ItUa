import { Button, Card, List, Modal as ModalLib, Spin, Typography } from "antd";

import type { Department } from "../../core";

interface Props {
  department: Department | null;
  clearDepartment: () => void;
  loading: boolean;
}

export const Modal = ({ department, loading, clearDepartment }: Props) => {
  return (
    <ModalLib
      title={department ? `Department: ${department.title}` : ""}
      onCancel={() => clearDepartment()}
      open={true}
      footer={null}
      width={600}
    >
      <Card>
        {!department || loading ? (
          <Spin size="small" />
        ) : (
          <>
            <Typography.Title level={5}>Department Details</Typography.Title>
            <Typography.Paragraph>
              <strong>Title:</strong> {department.title}
            </Typography.Paragraph>
            <Typography.Paragraph>
              <strong>Керівник:</strong> {department.chief?.fullName || "N/A"}
            </Typography.Paragraph>
            {department.chief?.email && (
              <Typography.Paragraph>
                <strong>Email:</strong> {department.chief.email}
              </Typography.Paragraph>
            )}
            {department.parent && (
              <>
                <Typography.Title level={5}>Підпорядкування</Typography.Title>
                <Typography.Paragraph>
                  {department.parent.title}
                </Typography.Paragraph>
              </>
            )}
            <Typography.Title level={5}>Users:</Typography.Title>
            <List
              bordered
              dataSource={department.users}
              renderItem={(user) => (
                <List.Item key={user.id}>{user.name}</List.Item>
              )}
              locale={{ emptyText: "No users in this department" }}
            />
          </>
        )}
      </Card>
      <Button
        type="primary"
        onClick={() => clearDepartment()}
        style={{ marginTop: 16 }}
      >
        Close
      </Button>
    </ModalLib>
  );
};
