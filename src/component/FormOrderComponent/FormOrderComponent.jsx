import React, { useState } from "react"
import { AutoComplete, Button, Flex, Form, Input, Select } from "antd"
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

  const userData = JSON.parse(localStorage.getItem("userData")) || {}

  const { role } = userData

  const onFinish = (values) => {
    const newData = { ...values, totalAmount, data, id: uuidv4() }
    const existingDataUpdate = JSON.parse(localStorage.getItem("data")) || []
    localStorage.setItem("data", JSON.stringify([...existingDataUpdate, newData]))
    setCurrentStep(2)
    navigate("/ingredients", { state: { data, totalAmount, ...values } })
  }

  const Title = (props) => (
    <Flex align="center" justify="space-between">
      {props.title}
      <a
        href="https://www.google.com/search?q=antd"
        target="_blank"
        rel="noopener noreferrer"
      >
        more
      </a>
    </Flex>
  )

  const renderItem = (title, count) => ({
    value: title,
    label: (
      <Flex align="center" justify="space-between">
        {title}
        <span>
          <UserOutlined /> {count}
        </span>
      </Flex>
    ),
  })

  const options = [
    {
      label: <Title title="Libraries" />,
      options: [renderItem("AntDesign", 10000), renderItem("AntDesign UI", 10600)],
    },
    {
      label: <Title title="Solutions" />,
      options: [
        renderItem("AntDesign UI FAQ", 60100),
        renderItem("AntDesign FAQ", 30010),
      ],
    },
    {
      label: <Title title="Articles" />,
      options: [renderItem("AntDesign design language", 100000)],
    },
  ]

  return (
    <>
      <div style={{ margin: "10px 300px 10px 220px" }}>
        <StepComponent currentStep={currentStep} />
      </div>
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
            Note: "",
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

          {/* {role === "admin" ? (
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
              <AutoComplete
                popupClassName="certain-category-search-dropdown"
                popupMatchSelectWidth={500}
                options={options}
                size="large"
              >
                <Input.Search size="large" placeholder="input here" />
              </AutoComplete>
            </Form.Item>
          ) : (
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
          )} */}

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
            name="Note"
            label="Note"
            rules={[
              {
                required: true,
                message: "Please input note",
              },
            ]}
          >
            <Input.TextArea showCount maxLength={100} placeholder="Note" />
          </Form.Item>

          <Form.Item
            wrapperCol={{
              offset: 11,
            }}
          >
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
