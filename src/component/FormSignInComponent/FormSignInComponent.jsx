import React from "react";
import { Button, Checkbox, Form, Input, message } from "antd";
import { useNavigate } from "react-router-dom";
import { GoogleOutlined } from "@ant-design/icons";

import firebases from "../../firebases";

import "./style.scss";
import { ROUTES } from "../../constants/routes";

const FormSignInComponent = () => {
  const navigate = useNavigate();
  //login google
  async function handleLoginGoogle(values) {
    const assignedRole = values.isAdmin ? "admin" : "user";

    try {
      const result = await firebases.signIn();
      const user = result.user;
      const userData = {
        name: user.displayName,
        email: user.email,
        role: assignedRole,
      };
      const valid = await firebases.queryDataUser([["email", "==", user.email]]);
      if (!valid) {
        await firebases.setDocUser(userData);
      }
      navigate("/");
    } catch (error) {
      console.log("lỗi do đăng nhập Google : ", error);
      message.error("Đăng nhập bằng Google thất bại.");
    }
  }

  const onFinish = (values) => {
    const storedUsers = JSON.parse(localStorage.getItem("users")) || [];

    const user = storedUsers.find(
      (user) => user.email === values.email && user.password === values.password
    );
    if (user) {
      localStorage.setItem("userData", JSON.stringify(user));
      const { role } = user;

      if (role === "admin") {
        navigate(ROUTES.ADMIN.HOME_ADMIN);
      } else {
        navigate("/");
      }
      message.success("Đăng nhập thành công!");
    } else {
      message.error("Đăng nhập thất bại. Vui lòng kiểm tra lại email và mật khẩu.");
    }
  };

  return (
    <>
      <Form
        className="wrapperFormComponent"
        name="basic"
        labelCol={{ span: 8 }}
        wrapperCol={{ span: 16 }}
        initialValues={{ remember: true }}
        onFinish={onFinish}
        autoComplete="off"
        layout="vertical"
      >
        <Form.Item
          className="FormItem"
          label="Email"
          name="email"
          rules={[
            { required: true, message: "Please input your email!" },
            { type: "email", message: "The input is not a valid email!" },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          className="FormItem"
          label="Password"
          name="password"
          rules={[{ required: true, message: "Please input your password!" }]}
        >
          <Input.Password />
        </Form.Item>
        <Form.Item name="remember" wrapperCol={{ offset: 0, span: 16 }}>
          <Checkbox>Remember me</Checkbox>
        </Form.Item>
        <Form.Item wrapperCol={{ offset: 0, span: 16 }}>
          <Button className="buttonFormComponent" type="primary" htmlType="submit">
            Submit
          </Button>
        </Form.Item>
        <Button style={{ width: 280 }} onClick={handleLoginGoogle}>
          <GoogleOutlined style={{ color: "blue" }} /> Login with Google
        </Button>
      </Form>
    </>
  );
};

export default FormSignInComponent;
