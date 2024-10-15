import React, { useEffect, useState } from "react"
import { Button, Checkbox, Form, Input, message } from "antd"
import { useNavigate } from "react-router-dom"
import { ROUTES } from "../../constants/routes"
import { auth, provider } from "../../firebase"
import { signInWithPopup } from "firebase/auth"
import { GoogleOutlined } from "@ant-design/icons"

import "./style.scss"

const FormSignInComponent = () => {
  const navigate = useNavigate()
  const [value, setValue] = useState("")

  const handleLoginGoogle = () => {
    signInWithPopup(auth, provider)
      .then((data) => {
        console.log("data", data)
        const userEmail = data.user.email
        const userName = data.user.displayName
        const userPhone = data.user.phoneNumber
        const userUid = data.user.uid
        setValue(userEmail)
        localStorage.setItem("email", userEmail)

        const user = {
          email: userEmail,
          name: userName,
          phone: userPhone,
          uid: userUid,
        }
        localStorage.setItem("userData", JSON.stringify(user))
        navigate("/")
        message.success("Đăng nhập Google thành công!")
      })
      .catch((error) => {
        console.error("Error during Google login:", error.message)
        message.error("Google login failed. Please try again.")
      })
  }

  useEffect(() => {
    setValue(localStorage.getItem("email"))
  }, [])

  const onFinish = (values) => {
    const storedUsers = JSON.parse(localStorage.getItem("users")) || []

    const user = storedUsers.find(
      (user) => user.email === values.email && user.password === values.password
    )
    if (user) {
      localStorage.setItem("userData", JSON.stringify(user))
      const { role } = user

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
    <>
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
        <Button style={{ width: 280 }} onClick={handleLoginGoogle}>
          <GoogleOutlined style={{ color: "blue" }} /> Login with Google
        </Button>
      </Form>
    </>
  )
}

export default FormSignInComponent
