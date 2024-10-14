import React from "react"
import { Button, Checkbox, Form, Input, message } from "antd"
import { useNavigate } from "react-router-dom"
import { ROUTES } from "../../constants/routes"

import "./style.scss"

const FormSignInComponent = () => {
  const navigate = useNavigate()

  const onFinish = (values) => {
    const storedUserData = JSON.parse(localStorage.getItem("userData"))

    if (
      storedUserData &&
      storedUserData.email === values.email &&
      storedUserData.password === values.password
    ) {
      const { role } = storedUserData

      if (role === "admin") {
        navigate(ROUTES.ADMIN.HOME_ADMIN)
      } else {
        navigate("/")
      }
      message.success("Đăng nhập thành công!")
    } else {
      message.error("Đăng nhập thất bại. Vui lòng kiểm tra lại email và mật khẩu.")
    }
  }

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo)
  }

  return (
    <Form
      className="wrapperFormComponent"
      name="basic"
      labelCol={{ span: 8 }}
      wrapperCol={{ span: 16 }}
      initialValues={{ remember: true }}
      onFinish={onFinish}
      onFinishFailed={onFinishFailed}
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
    </Form>
  )
}

export default FormSignInComponent
