import React from "react";
import { Button, Form, Input } from "antd";
import { useNavigate, useLocation } from "react-router-dom";

import "./style.scss";

const FormOrderComponent = ({ data }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const { totalAmount } = location.state || {};

  const onFinish = (values) => {
    navigate("/ingredients", { state: { data, totalAmount } });
  };

  return (
    <div className="wrapperFormOrder">
      <Form
        name="nest-messages"
        onFinish={onFinish}
        className="formOrder"
        layout="vertical"
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
          <Input placeholder="Phone" />
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
          label="note"
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
  );
};

export default FormOrderComponent;
