import React, { useMemo, useState } from "react"
import { Button, InputNumber, message } from "antd"
import { useNavigate } from "react-router-dom"

import BurgerComponent from "../../component/BurgerBuilderComponent/BurgerBuilderComponent"
import TableComponent from "../../component/TableComponent/TableComponent"
import StepComponent from "../../component/StepComponent/StepComponents"

import "./style.scss"

const BurgerBuilder = () => {
  const navigate = useNavigate()
  const userData = JSON.parse(localStorage.getItem("userData"))
  const [currentStep, setCurrentStep] = useState(0)

  const [data, setData] = useState([
    { key: "1", name: "Salad", price: 1000, amount: 0 },
    { key: "2", name: "Bacon", price: 12000, amount: 0 },
    { key: "3", name: "Cheese", price: 1000, amount: 0 },
    { key: "4", name: "Meat", price: 10000, amount: 0 },
  ])

  const columns = [
    {
      title: "Name",
      dataIndex: "name",
    },
    {
      title: "Price",
      dataIndex: "price",
      width: "30%",
      render: (text, record) => <span>{record.price.toLocaleString()} VNĐ</span>,
    },
    {
      title: "Amount",
      dataIndex: "amount",
      render: (text, record) => (
        <InputNumber
          min={0}
          value={record.amount}
          onChange={(value) => handleAmountChange(record.key, value)}
        />
      ),
    },
    {
      dataIndex: "amount",
      width: "20%",
      render: (text, record) => (
        <span>{(record.amount * record.price).toLocaleString()} VNĐ</span>
      ),
    },
    {
      title: "Action",
      dataIndex: "action",
      render: (text, record) => renderAction(record),
      width: "20s%",
    },
  ]

  const renderAction = (record) => {
    return (
      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <Button className="button-less" onClick={() => handleLess(record.key)}>
          Less
        </Button>
        <Button className="button-more" onClick={() => handleMore(record.key)}>
          More
        </Button>
        {/* <Button className="button-more" onClick={() => handleDelete(record.key)}>
          xóa
        </Button> */}
      </div>
    )
  }

  const handleMore = (key) => {
    setData((prevData) =>
      prevData.map((item) =>
        item.key === key ? { ...item, amount: item.amount + 1 } : item
      )
    )
  }

  const handleLess = (key) => {
    setData((prevData) =>
      prevData.map((item) =>
        item.key === key && item.amount > 0 ? { ...item, amount: item.amount - 1 } : item
      )
    )
  }

  // const handleDelete = (key) => {
  //   setData((prevData) => prevData.filter((item) => item.key !== key));
  // };

  const handleAmountChange = (key, value) => {
    setData((prevData) =>
      prevData.map((item) => (item.key === key ? { ...item, amount: value } : item))
    )
  }

  const totalAmount = useMemo(() => {
    return data.reduce((sum, item) => sum + item.amount * item.price, 0)
  }, [data])

  const handleSubmit = () => {
    if (!userData) {
      navigate("/SignIn", { state: { from: window.location.pathname } })
    } else if (totalAmount === 0) {
      message.info("Vui lòng chọn món để tiếp tục mua sắm")
    } else {
      setCurrentStep(1)
      navigate("/Order", { state: { data, totalAmount, id: userData.id } })
    }
  }

  return (
    <div>
      <BurgerComponent amount={totalAmount} />

      <div style={{ margin: "10px 300px 10px 220px" }}>
        <StepComponent currentStep={currentStep} />
      </div>

      <div className="table-burger">
        <TableComponent columns={columns} data={data} />
        <div className="buttonTableCheckout">
          <Button disabled={totalAmount === 0} type="primary" onClick={handleSubmit}>
            CheckOut
          </Button>
        </div>
      </div>
    </div>
  )
}

export default BurgerBuilder
