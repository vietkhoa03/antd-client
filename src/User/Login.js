import { FacebookFilled, GoogleOutlined } from "@ant-design/icons";
import { Button, Divider, Form, Input, message, Typography } from "antd";
import axios from "axios";
import React from "react";
import { useNavigate } from "react-router-dom";
import "./Login.css";

const Login = () => {
  const navigate = useNavigate();
  const handleLogin = async (values) => {
    try {
      const response = await axios.post(
        "https://admin-dev.oneship.com.vn/api/v1/admin/auth/login",
        values
      );

      if (response.data && response.data.statusCode === 200) {
        message.success("Đăng nhập thành công!");
        localStorage.setItem("token", response.data.data.accessToken);
        navigate("/home");
      } else {
        message.error(
          response.data.data.message ||
            "Đăng nhập thất bại! Vui lòng kiểm tra lại."
        );
      }
    } catch (error) {
      message.error("Đăng nhập thất bại! Vui lòng kiểm tra lại.");
      console.error("Lỗi đăng nhập:", error);
    }
  };

  return (
    <div className="loginPage">
      <Form className="loginForm" onFinish={handleLogin}>
        <Typography.Title>Login</Typography.Title>
        <Form.Item
          rules={[
            {
              required: true,
              message: "Please enter valid username!",
            },
          ]}
          label="Username"
          name="username"
        >
          <Input placeholder="Enter your username" />
        </Form.Item>
        <Form.Item
          rules={[
            {
              required: true,
              message: "Please enter valid password!",
            },
          ]}
          label="Password"
          name="password"
        >
          <Input.Password placeholder="Enter your password" />
        </Form.Item>
        <Button type="primary" htmlType="submit" block>
          Login
        </Button>
        <Divider style={{ borderColor: "black" }}>or Login with</Divider>
        <div className="Sociallogin">
          <GoogleOutlined className="socialIcon" />
          <FacebookFilled className="socialIcon" style={{ color: "blue" }} />
        </div>
      </Form>
    </div>
  );
};
export default Login;
