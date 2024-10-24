import { FilterOutlined } from "@ant-design/icons";
import { Button, Col, Row, Spin, Table } from "antd";
import { useState } from "react";

import type { User } from "../../core";
import { Filter } from "./Filter";

export interface FilterValues {
  name: string;
  lastName: string;
  position: string;
  email: string;
}

interface Props {
  users: User[];
  loading: boolean;
  applyUsersFilter: (values: Partial<FilterValues>) => void;
}
export const Users = ({ users, loading, applyUsersFilter }: Props) => {
  const [openFilter, setOpenFilter] = useState(false);

  const handleOpenFilter = () => setOpenFilter(true);
  const handleCloseFilter = () => setOpenFilter(false);

  const columns = [
    { title: "Ім'я", dataIndex: "name", key: "name" },
    { title: "Прізвище", dataIndex: "lastName", key: "lastName" },
    { title: "Посада", dataIndex: "position", key: "position" },
    { title: "E-mail", dataIndex: "email", key: "email" },
  ];

  if (loading) {
    return <Spin size="large" />;
  }

  return (
    <Row gutter={[16, 16]}>
      <Col>
        <Row justify="end">
          <Button
            icon={<FilterOutlined />}
            onClick={() => handleOpenFilter()}
            type="text"
          >
            Фільтр
          </Button>
        </Row>
      </Col>

      <Col>
        <Table
          columns={columns}
          dataSource={users.map((user) => ({ key: user.id, ...user }))}
          pagination={{ pageSize: 5 }}
          scroll={{ y: "calc(100vh - 150px)", x: "max-content" }}
        />
      </Col>
      <Filter
        open={openFilter}
        handleCloseFilter={() => handleCloseFilter()}
        onFilterChange={applyUsersFilter}
      />
    </Row>
  );
};
