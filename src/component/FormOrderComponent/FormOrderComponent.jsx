import React, { useState, useEffect } from "react"
import { AutoComplete, Button, Form, Input } from "antd"
import { useNavigate, useLocation } from "react-router-dom"
import { v4 as uuidv4 } from "uuid"

import StepComponent from "../StepComponent/StepComponents"

import "./style.scss"
import { UserOutlined } from "@ant-design/icons"

const FormOrderComponent = ({ data }) => {
  const navigate = useNavigate()
  const location = useLocation()
  const { totalAmount, id } = location.state || {}

  const [currentStep, setCurrentStep] = useState(1)
  const [userOptions, setUserOptions] = useState([])
  const [form] = Form.useForm()

  const userData = JSON.parse(localStorage.getItem("userData")) || {}
  const { role } = userData

  useEffect(() => {
    const users = JSON.parse(localStorage.getItem("users")) || []
    const options = users.map((user) => ({
      value: user.name,
      label: (
        <div>
          <span>
            <UserOutlined />
          </span>
          <span style={{ marginLeft: 20 }}>{user.name}</span>
        </div>
      ),
    }))
    setUserOptions(options)
  }, [])

  const onFinish = (values) => {
    const newData = { ...values, totalAmount, data, id: uuidv4(), userId: id }
    const existingDataUpdate = JSON.parse(localStorage.getItem("data")) || []
    localStorage.setItem("data", JSON.stringify([...existingDataUpdate, newData]))
    setCurrentStep(2)
    navigate("/ingredients", { state: { data, totalAmount, ...values } })
  }

  const handleUserSelect = (value) => {
    const users = JSON.parse(localStorage.getItem("users")) || []
    const selectedUser = users.find((user) => user.name === value)

    if (selectedUser) {
      form.setFieldsValue({
        phone: selectedUser.phone,
        email: selectedUser.email,
        address: selectedUser.address,
      })
    }
  }

  return (
    <>
      <div style={{ margin: "10px 300px 10px 220px" }}>
        <StepComponent currentStep={currentStep} />
      </div>
      <div className="wrapperFormOrder">
        <Form
          form={form}
          name="nest-messages"
          onFinish={onFinish}
          className="formOrder"
          layout="vertical"
          initialValues={{
            name: userData.name || "",
            phone: userData.phone || "",
            email: userData.email || "",
            address: userData.address || "",
            Note: "",
          }}
        >
          {role === "admin" ? (
            <Form.Item
              label="Name"
              name="name"
              rules={[{ required: true, message: "Please input your name!" }]}
            >
              <AutoComplete
                popupClassName="certain-category-search-dropdown"
                options={userOptions}
                size="large"
                onSelect={handleUserSelect}
              >
                <Input.Search size="large" placeholder="input here" />
              </AutoComplete>
            </Form.Item>
          ) : (
            <Form.Item
              label="Name"
              name="name"
              rules={[{ required: true, message: "Please input your name!" }]}
            >
              <Input placeholder="Name" />
            </Form.Item>
          )}

          <Form.Item
            label="Phone"
            name="phone"
            rules={[{ required: true, message: "Please input your phone!" }]}
          >
            <Input placeholder="Phone" maxLength={10} />
          </Form.Item>

          <Form.Item
            label="Email"
            name="email"
            rules={[
              { required: true, type: "email", message: "Please input your email!" },
            ]}
          >
            <Input placeholder="Email" />
          </Form.Item>

          <Form.Item
            label="Address"
            name="address"
            rules={[{ required: true, message: "Please input your address!" }]}
          >
            <Input placeholder="Address" />
          </Form.Item>

          <Form.Item
            name="Note"
            label="Note"
            rules={[{ required: true, message: "Please input note" }]}
          >
            <Input.TextArea showCount maxLength={100} placeholder="Note" />
          </Form.Item>

          <Form.Item wrapperCol={{ offset: 11 }}>
            <Button className="ButtonOrder" type="primary" htmlType="submit">
              Order
            </Button>
          </Form.Item>
        </Form>
      </div>
    </>
  )
}

export default FormOrderComponent
