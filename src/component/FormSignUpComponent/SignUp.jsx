import React from "react"
import { Button, Checkbox, Form, Input, message } from "antd"
import { useNavigate } from "react-router-dom"
import { ROUTES } from "../../constants/routes"
import { v4 as uuidv4 } from "uuid"

const FormSignUpComponent = ({ mode }) => {
  const navigate = useNavigate()

  const onFinish = (values) => {
    const assignedRole = values.isAdmin ? "admin" : "user"

    const userData = {
      id: uuidv4(),
      name: values.name,
      email: values.email,
      password: values.password,
      role: assignedRole,
    }

    const existingUsers = JSON.parse(localStorage.getItem("users")) || []

    existingUsers.push(userData)

    localStorage.setItem("users", JSON.stringify(existingUsers))

    localStorage.setItem("userData", JSON.stringify(userData))

    message.success("Đăng ký thành công, giờ bạn hãy đăng nhập")
    setTimeout(() => {
      navigate(ROUTES.SIGN_IN)
    }, 1000)
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
        label="Name"
        name="name"
        rules={[
          { required: true, message: "Please input your name!" },
          { type: "string", message: "The input is not a valid name!" },
        ]}
      >
        <Input />
      </Form.Item>

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

      <Form.Item
        name="isAdmin"
        valuePropName="checked"
        wrapperCol={{ offset: 0, span: 16 }}
      >
        <Checkbox>Register as Admin</Checkbox>
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

export default FormSignUpComponent
