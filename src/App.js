import { FacebookFilled, GoogleOutlined } from "@ant-design/icons";
import { Button, Divider, Form, Input, message, Typography } from "antd";
import axios from "axios";
import React, { Component } from "react";
import "./App.css";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      password: "",
    };
  }

  login = async (values) => {
    try {
      const response = await axios.post(
        "https://admin-dev.oneship.com.vn/api/v1/admin/auth/login",
        values,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      console.log("res", response);

      if (response.status === 200) {
        message.success("Login Successful!");
        console.log("Login response:", response.data);
      }
    } catch (error) {
      message.error("Login failed! Please check your credentials.");
      console.error("Login error:", error);
    }
  };

  render() {
    return (
      <div className="loginPage">
        <Form className="loginForm" onFinish={this.login}>
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
  }
}

export default App;
