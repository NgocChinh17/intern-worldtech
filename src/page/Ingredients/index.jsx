import React, { useEffect, useState } from "react"
import { Table, Tag } from "antd"
import { useLocation } from "react-router-dom"
import { v4 as uuidv4 } from "uuid"
import { debounce } from "lodash"
import { removeAccents } from "../../utils"
import StepComponent from "../../component/StepComponent/StepComponents"
import SearchComponent from "../../component/SearchComponent/SearchComponent"
import "./style.scss"

const Ingredients = () => {
  const location = useLocation()
  const [storedData, setStoredData] = useState({
    totalAmount: 0,
    data: [],
  })
  const [userData, setUserData] = useState(null)
  const [dataUpdate, setDataUpdate] = useState([])
  const [currentStep, setCurrentStep] = useState(2)
  const [searchText, setSearchText] = useState("")

  useEffect(() => {
    const savedData = localStorage.getItem("orderData")
    const userDataFromStorage = localStorage.getItem("userData")
    const savedDataUpdate = JSON.parse(localStorage.getItem("data")) || []

    if (userDataFromStorage) {
      const user = JSON.parse(userDataFromStorage)
      setUserData(user)

      const userOrders = savedDataUpdate.filter((item) => item.userId === user.id)
      setDataUpdate(userOrders)
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
  }, [location.state])

  const handleSearch = debounce((value) => {
    setSearchText(value)
  }, 1000)

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
      dataIndex: "userPhone",
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
      title: "Burger Name",
      dataIndex: "name",
      render: (text, record) => (
        <div>{record.name.map((item) => `${item.name} (${item.amount})`).join(", ")}</div>
      ),
    },
    {
      title: "Status",
      dataIndex: "status",
      render: (text) => {
        let color = ""
        switch (text) {
          case "pending":
            color = "magenta"
            break
          case "doing":
            color = "orange"
            break
          case "shipperReceived":
            color = "blue"
            break
          case "done":
            color = "green"
            break
          default:
            color = "default"
        }
        return <Tag color={color}>{text}</Tag>
      },
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
  ]

  const tableData = dataUpdate.map((item) => ({
    key: item.id || uuidv4(),
    name: Array.isArray(item.data) ? item.data : [],
    totalAmount: typeof item.totalAmount === "number" ? item.totalAmount : 0,
    userName: item.name || "N/A",
    phone: item.phone || "N/A",
    note: item.Note || "",
    date: item.date || new Date().toDateString(),
    status: item.status || "pending",
  }))

  const filteredData = tableData.filter((item) => {
    const normalizedUserName = removeAccents(item.userName.toLowerCase())
    const normalizedPhone = removeAccents(item.phone.toLowerCase())
    const normalizedNote = removeAccents(item.note.toLowerCase())
    const normalizedTotalAmount = item.totalAmount
      ? item.totalAmount.toLocaleString().toLowerCase()
      : ""
    const normalizedIngredientNames = Array.isArray(item.name)
      ? item.name.map((ingredient) => removeAccents(ingredient.name.toLowerCase()))
      : []

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

  return (
    <div>
      <div style={{ marginLeft: 200, marginRight: 300 }}>
        <StepComponent currentStep={currentStep} />
      </div>

      <div style={{ marginLeft: 200, marginRight: 300, marginBottom: 10, width: 300 }}>
        <SearchComponent onSearch={handleSearch} />
      </div>

      <Table
        className="table-ingredients"
        pagination={{
          pageSize: 2,
          total: filteredData.length,
        }}
        columns={columns}
        dataSource={filteredData}
      />
    </div>
  )
}

export default Ingredients
