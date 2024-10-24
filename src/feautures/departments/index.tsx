import { DeleteOutlined, EditOutlined, UserOutlined } from "@ant-design/icons";
import { Row, Spin, Tree } from "antd";
import type { DataNode } from "antd/es/tree";
import { useEffect, useState } from "react";

import type { Department } from "../../core";
import { Modal } from "./Modal";

interface Props {
  departments: Department[];
  getDepartment(id: number): void;
  clearDepartment(): void;
  departmentsLoading: boolean;
  department: Department | null;
  departmentLoading: boolean;
}

export const Departments = ({
  departments,
  departmentsLoading,
  clearDepartment,
  departmentLoading,
  department,
  getDepartment,
}: Props) => {
  const [treeNode, setTreeNode] = useState<DataNode[]>([]);
  const [selectedId, setSelectedId] = useState<number | null>(null);
  useEffect(() => {
    const TreeNode = (): DataNode[] => {
      const mainDepartment = departments?.find(
        (department) => department.isMain,
      );
      if (!mainDepartment) return [];

      const lvl1 = departments.filter((department) => department.lvl === 1);
      const lvl2 = departments.filter((department) => department.lvl === 2);

      return [
        {
          title: (
            <div className="tree-node">
              <span className="tree-title">{mainDepartment.title}</span>
              <div className="tree-icons">
                <UserOutlined className="tree-icon" />
                <span className="tree-text">
                  Керівник: {mainDepartment.chief?.fullName}
                </span>
                <EditOutlined className="tree-icon" />
                <DeleteOutlined className="tree-icon" />
              </div>
            </div>
          ),
          key: mainDepartment.id.toString(),
          children: lvl1.map((level1Dep) => ({
            title: (
              <div className="tree-node tree-node-indent">
                <span className="tree-title">{level1Dep.title}</span>
                <div className="tree-icons">
                  <UserOutlined className="tree-icon" />
                  <span className="tree-text ">
                    Керівник: {level1Dep.chief?.fullName}
                  </span>
                  <EditOutlined className="tree-icon" />
                  <DeleteOutlined className="tree-icon" />
                </div>
              </div>
            ),
            key: level1Dep.id.toString(),
            children: lvl2
              .filter((level2Dep) => level2Dep.parent?.id === level1Dep.id)
              .map((level2Dep) => ({
                title: (
                  <div className="tree-node tree-node-indent">
                    <span className="tree-title">{level2Dep.title}</span>
                    <div className="tree-icons">
                      <UserOutlined className="tree-icon" />
                      <span className="tree-text">
                        Керівник: {level2Dep.chief?.fullName}
                      </span>
                      <EditOutlined className="tree-icon" />
                      <DeleteOutlined className="tree-icon" />
                    </div>
                  </div>
                ),

                key: level2Dep.id.toString(),
                children: [],
              })),
          })),
        },
      ];
    };

    setTreeNode(TreeNode());
  }, [departments]);

  if (departmentsLoading) {
    return <Spin size="large" />;
  }

  const handleSelect = async (selectedKeys: React.Key[]) => {
    if (!selectedKeys.length) return;
    const id = Number(selectedKeys[0]);
    setSelectedId(id);
    getDepartment(id);
  };

  return (
    <Row
      style={{
        alignItems: "center",
        justifyContent: "center",
        width: "100%",
        padding: "20px",
      }}
    >
      <Tree
        defaultExpandAll
        showIcon
        onSelect={handleSelect}
        treeData={treeNode}
      />
      {selectedId && (
        <Modal
          department={department}
          loading={departmentLoading}
          clearDepartment={() => {
            setSelectedId(null);
            clearDepartment();
          }}
        />
      )}
    </Row>
  );
};
