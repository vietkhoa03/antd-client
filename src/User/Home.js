import { EditOutlined, PlusOutlined } from "@ant-design/icons";
import { Button, Form, Input, Layout, Menu, Modal, Space, Table } from "antd";
import axios from "axios";
import React, { useEffect, useState } from "react";

const { Header, Content, Footer } = Layout;
const { Search } = Input;

const Home = () => {
  const [users, setUsers] = useState([]);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [form] = Form.useForm();
  const token = localStorage.getItem("token");
  const fetchUsers = async () => {
    if (!token) {
      console.log("No token found");
      return;
    }

    try {
      const response = await axios.get(
        "https://admin-dev.oneship.com.vn/api/v1/admin/admins",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log("Users:", response);
      setUsers(response.data.data.items);
    } catch (error) {
      console.error("Error fetching users:", error);
    }
  };

  const handleAddOrEditUser = async (values) => {
    if (currentUser) {
      await axios.patch(
        `https://admin-dev.oneship.com.vn/api/v1/admin/admins/${currentUser.id}`,
        values,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
    } else {
      await axios.post(
        "https://admin-dev.oneship.com.vn/api/v1/admin/admins",
        values,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
    }
    setIsModalVisible(false);
    setCurrentUser(null);
    form.resetFields();
    fetchUsers();
  };

  //   const handleDeleteUser = async (id) => {
  //     await axios.delete("");
  //     fetchUsers();
  //   };

  useEffect(() => {
    fetchUsers();
  }, []);

  const filterUsers = users.filter(
    (user) =>
      user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const columns = [
    { title: "Name", dataIndex: "name", key: "name" },
    { title: "Email", dataIndex: "email", key: "email" },
    {
      title: "Action",
      key: "action",
      render: (_, record) => (
        <Space>
          <Button
            icon={<EditOutlined />}
            onClick={() => {
              setCurrentUser(record);
              setIsModalVisible(true);
            }}
          />
          {/* <Button
            icon={<DeleteOutlined />}
            danger
            onClick={() => handleDeleteUser(record.id)}
          /> */}
        </Space>
      ),
    },
  ];
  const passwordRules = [
    { required: true, message: "Password is required" },
    { min: 8, message: "Password must be at least 8 characters" },
    {
      pattern: /(?=.*[a-z])/,
      message: "Password must contain at least one lowercase letter",
    },
    {
      pattern: /(?=.*[A-Z])/,
      message: "Password must contain at least one uppercase letter",
    },
    {
      pattern: /(?=.*[0-9])/,
      message: "Password must contain at least one number",
    },
    {
      pattern: /(?=.*[!@#$%^&*])/,
      message: "Password must contain at least one special character",
    },
  ];
  return (
    <Layout style={{ minHeight: "100vh" }}>
      <Header>
        <Menu theme="dark" mode="horizontal">
          <Menu.Item key="home">Home</Menu.Item>
          <Menu.Item key="contact">Contact</Menu.Item>
        </Menu>
      </Header>
      <Content style={{ padding: "50px" }}>
        <Space style={{ marginBottom: "20px", float: "left" }}>
          <Button
            type="primary"
            icon={<PlusOutlined />}
            onClick={() => setIsModalVisible(true)}
          >
            Add User
          </Button>
        </Space>
        <Space style={{ marginBottom: "20px", float: "right" }}>
          <Search
            placeholder="Search by name or email"
            onSearch={(value) => setSearchTerm(value)}
            style={{ width: 300 }}
          />
        </Space>
        <div style={{ clear: "both" }} />
        <Table dataSource={filterUsers} columns={columns} rowKey="id" />

        <Modal
          title={currentUser ? "Edit User" : "Add User"}
          visible={isModalVisible}
          onCancel={() => {
            setIsModalVisible(false);
            setCurrentUser(null);
            form.resetFields();
          }}
          footer={null}
        >
          <Form
            form={form}
            initialValues={currentUser}
            onFinish={handleAddOrEditUser}
            layout="vertical"
          >
            <Form.Item name="name" label="Name" rules={[{ required: true }]}>
              <Input />
            </Form.Item>
            <Form.Item
              name="email"
              label="Email"
              rules={[{ required: true, type: "email" }]}
            >
              <Input />
            </Form.Item>
            <Form.Item name="password" label="Password" rules={passwordRules}>
              <Input.Password />
            </Form.Item>
            <Form.Item>
              <Form.Item
                name="status"
                label="Status"
                rules={[{ required: true }]}
              >
                <Input />
              </Form.Item>

              <Form.Item
                name="phone"
                label="Phone"
                rules={[{ required: true }]}
              >
                <Input />
              </Form.Item>

              <Form.Item
                name="roleId"
                label="Role"
                rules={[{ required: true }]}
              >
                <Input type="number" />
              </Form.Item>
              <Button type="primary" htmlType="submit">
                Submit
              </Button>
            </Form.Item>
          </Form>
        </Modal>
      </Content>
      <Footer
        style={{
          textAlign: "center",
          backdropColor: "#001529",
          color: "#fff",
          position: "sticky",
          bottom: 0,
        }}
      >
        {new Date().getFullYear()}
      </Footer>
    </Layout>
  );
};

export default Home;
