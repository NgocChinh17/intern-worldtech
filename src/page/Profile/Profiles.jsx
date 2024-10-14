import React from "react"
import { Button, Form, Input, message } from "antd"

import "./style.scss"

const Profiles = ({ data }) => {
  const userData = JSON.parse(localStorage.getItem("userData")) || {}

  const onFinish = (values) => {
    try {
      localStorage.setItem("userData", JSON.stringify({ ...userData, ...values }))
      message.success("Cập nhật thành công")
    } catch (error) {
      message.error("Có lỗi xảy ra khi cập nhật thông tin.")
    }
  }

  return (
    <>
      <h2 style={{ marginLeft: 200 }}>Thông Tin Tài Khoản</h2>
      <div className="wrapperFormOrder">
        <Form
          name="nest-messages"
          onFinish={onFinish}
          className="formOrder"
          layout="vertical"
          initialValues={{
            name: userData.name || "",
            phone: userData.phone || "",
            email: userData.email || "",
            address: userData.address || "",
          }}
        >
          <Form.Item
            label="Name"
            name="name"
            rules={[
              {
                required: true,
                message: "Please input your name!",
              },
            ]}
          >
            <Input placeholder="Name" />
          </Form.Item>

          <Form.Item
            label="Phone"
            name="phone"
            rules={[
              {
                required: true,
                message: "Please input your phone!",
              },
            ]}
          >
            <Input placeholder="Phone" maxLength={10} />
          </Form.Item>

          <Form.Item
            label="Email"
            name="email"
            rules={[
              {
                required: true,
                type: "email",
                message: "Please input your email!",
              },
            ]}
          >
            <Input placeholder="Email" />
          </Form.Item>

          <Form.Item
            label="Address"
            name="address"
            rules={[
              {
                required: true,
                message: "Please input your address!",
              },
            ]}
          >
            <Input placeholder="Address" />
          </Form.Item>

          <Form.Item
            wrapperCol={{
              offset: 10,
            }}
          >
            <Button className="ButtonOrder" type="primary" htmlType="submit">
              Cập Nhật
            </Button>
          </Form.Item>
        </Form>
      </div>
    </>
  )
}

export default Profiles
