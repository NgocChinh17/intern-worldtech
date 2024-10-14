import React, { useEffect, useState, useCallback } from "react"
import { Button, Form, Input, Select, Table } from "antd"
import { removeAccents } from "../../utils"
import { debounce } from "lodash"
import { v4 as uuidv4 } from "uuid"
import { useLocation } from "react-router-dom"
import { DeleteOutlined, EditOutlined } from "@ant-design/icons"

import SearchComponent from "../SearchComponent/SearchComponent"
import DrawerComponent from "../DrawerComponent/DrawerComponent"
import ModalComponent from "../ModalComponent/ModalComponent"

const AdminDashboard = () => {
  const [form] = Form.useForm()
  const { Option } = Select

  const [searchText, setSearchText] = useState("")
  const [dataUpdate, setDataUpdate] = useState([])
  const [userData, setUserData] = useState(null)
  const [currentStep, setCurrentStep] = useState(2)
  const [storedData, setStoredData] = useState({
    totalAmount: 0,
    data: [],
  })
  const [isOpenDrawer, setIsOpenDrawer] = useState(false)
  const [isModalOpenDelete, setIsModalOpenDelete] = useState(false)
  const [itemToDelete, setItemToDelete] = useState(null)
  const location = useLocation()

  useEffect(() => {
    const savedData = localStorage.getItem("orderData")
    const userDataFromStorage = localStorage.getItem("userData")
    const savedDataUpdate = JSON.parse(localStorage.getItem("data")) || []

    if (userDataFromStorage) {
      setUserData(JSON.parse(userDataFromStorage))
    }
    if (location.state) {
      const { totalAmount, data } = location.state
      const dateOrder = new Date().toDateString()
      setStoredData({ totalAmount, data })
      setCurrentStep(3)
      localStorage.setItem(
        "orderData",
        JSON.stringify({ totalAmount, data, date: dateOrder })
      )
    } else if (savedData) {
      setStoredData(JSON.parse(savedData))
    }
    setDataUpdate(savedDataUpdate)
  }, [location.state])

  const tableData = dataUpdate.map((item) => ({
    key: item.id || uuidv4(),
    name: item.data,
    totalAmount: item.totalAmount,
    userName: item.name,
    phone: item.phone,
    note: item.Note,
    date: item.date || new Date().toDateString(),
    status: item.status || "pending",
  }))

  const handleSearch = debounce((value) => {
    setSearchText(value)
  }, 1000)

  const filteredData = tableData.filter((item) => {
    const normalizedUserName = removeAccents(item.userName.toLowerCase())
    const normalizedPhone = removeAccents(item.phone.toLowerCase())
    const normalizedNote = removeAccents(item.note.toLowerCase())
    const normalizedTotalAmount = item.totalAmount.toLocaleString().toLowerCase()
    const normalizedIngredientNames = item.name.map((ingredient) =>
      removeAccents(ingredient.name.toLowerCase())
    )

    const normalizedSearchText = removeAccents(searchText.toLowerCase())

    return (
      normalizedUserName.includes(normalizedSearchText) ||
      normalizedPhone.includes(normalizedSearchText) ||
      normalizedNote.includes(normalizedSearchText) ||
      normalizedTotalAmount.includes(normalizedSearchText) ||
      normalizedIngredientNames.some((ingredient) =>
        ingredient.includes(normalizedSearchText)
      )
    )
  })

  const handleUpdateStatus = (itemId, newStatus) => {
    const updatedData = dataUpdate.map((item) =>
      item.id === itemId ? { ...item, status: newStatus } : item
    )
    setDataUpdate(updatedData)
    localStorage.setItem("data", JSON.stringify(updatedData))
  }

  const onFinish = (values) => {
    handleUpdateStatus(itemToDelete, values.status)
    setIsOpenDrawer(false)
  }

  const renderAction = (text, record) => {
    return (
      <div>
        <EditOutlined
          style={{
            fontSize: 20,
            cursor: "pointer",
            paddingRight: 10,
            color: "red",
          }}
          onClick={() => {
            setItemToDelete(record.key)
            setIsOpenDrawer(true)
            form.setFieldsValue({
              name: record.userName,
              phone: record.phone,
              price: record.totalAmount,
              status: record.status || "Pending",
            })
          }}
        />
        <DeleteOutlined
          style={{ fontSize: 20, cursor: "pointer", color: "orange" }}
          onClick={() => {
            setItemToDelete(record.key)
            setIsModalOpenDelete(true)
          }}
        />
      </div>
    )
  }

  const columns = [
    {
      title: "Name",
      dataIndex: "userName",
      render: (text, record) => (
        <div
          style={{
            overflow: "hidden",
            textOverflow: "ellipsis",
            whiteSpace: "nowrap",
            width: 83,
          }}
        >
          {record.userName || "N/A"}
        </div>
      ),
    },
    {
      title: "Phone",
      dataIndex: "phone",
      render: (text, record) => (
        <div
          style={{
            overflow: "hidden",
            textOverflow: "ellipsis",
            whiteSpace: "nowrap",
            width: 83,
          }}
        >
          {record.phone}
        </div>
      ),
    },
    {
      title: "Note",
      dataIndex: "note",
      width: "17%",
      render: (text, record) => (
        <div
          style={{
            overflow: "hidden",
            textOverflow: "ellipsis",
            whiteSpace: "nowrap",
            width: 100,
          }}
        >
          {record.note}
        </div>
      ),
    },
    {
      title: "Burger",
      dataIndex: "name",
      render: (text, record) => (
        <div>{record.name.map((item) => `${item.name} (${item.amount})`).join(", ")}</div>
      ),
    },
    {
      title: "Status",
      dataIndex: "status",
      render: (text) => <span>{text}</span>,
    },
    {
      title: "Total Price",
      dataIndex: "totalAmount",
      render: (text, record) => <span>{record.totalAmount.toLocaleString()} VNĐ</span>,
    },
    {
      title: "Ngày Mua",
      dataIndex: "date",
      render: (text, record) => <span>{record.date}</span>,
    },
    {
      title: "Action",
      dataIndex: "action",
      render: renderAction,
    },
  ]

  const handleDelete = useCallback(() => {
    if (itemToDelete) {
      const updatedData = dataUpdate.filter((item) => item.id !== itemToDelete)
      setDataUpdate(updatedData)
      localStorage.setItem("data", JSON.stringify(updatedData))
      setItemToDelete(null)
    }
    setIsModalOpenDelete(false)
  }, [dataUpdate, itemToDelete])

  const handleCancelDelete = () => {
    setIsModalOpenDelete(false)
    setItemToDelete(null)
  }

  return (
    <div style={{ marginRight: 10 }}>
      <div style={{ marginBottom: 10, width: 300 }}>
        <SearchComponent onSearch={handleSearch} />
      </div>

      <Table
        style={{ width: "100%", marginLeft: 0 }}
        className="table-ingredients"
        pagination={{
          pageSize: 2,
          total: filteredData.length,
        }}
        columns={columns}
        dataSource={filteredData}
      />

      <DrawerComponent
        title="Quản Lý Sản Phẩm"
        isOpen={isOpenDrawer}
        width="45%"
        onClose={() => setIsOpenDrawer(false)}
      >
        <Form
          name="basic"
          labelCol={{ span: 8 }}
          wrapperCol={{ span: 16 }}
          style={{ maxWidth: 600 }}
          labelAlign="left"
          onFinish={onFinish}
          autoComplete="off"
          form={form}
        >
          <Form.Item
            label="Name"
            name="name"
            rules={[{ required: true, message: "Please input your name!" }]}
          >
            <Input disabled />
          </Form.Item>

          <Form.Item
            label="Phone"
            name="phone"
            rules={[{ required: true, message: "Please input your phone!" }]}
          >
            <Input disabled />
          </Form.Item>

          <Form.Item
            label="Price"
            name="price"
            rules={[{ required: true, message: "Please input your price!" }]}
          >
            <Input disabled />
          </Form.Item>

          <Form.Item
            label="Status"
            name="status"
            rules={[{ required: true, message: "Please select a status!" }]}
          >
            <Select placeholder="Select a status" allowClear>
              <Option value="pending">Pending</Option>
              <Option value="doing">Doing</Option>
              <Option value="shipperReceived">Shipper Received</Option>
              <Option value="done">Done</Option>
            </Select>
          </Form.Item>

          <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
            <Button type="primary" htmlType="submit">
              Submit
            </Button>
          </Form.Item>
        </Form>
      </DrawerComponent>

      <ModalComponent
        title="Confirm Deletion"
        open={isModalOpenDelete}
        onOk={handleDelete}
        onCancel={handleCancelDelete}
      >
        <p>Bạn có chắc muốn xóa sản phẩm này không?</p>
      </ModalComponent>
    </div>
  )
}

export default AdminDashboard
