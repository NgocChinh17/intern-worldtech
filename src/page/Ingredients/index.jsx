import React, { useEffect, useState } from "react";
import { Table } from "antd";
import { useLocation } from "react-router-dom";
import { v4 as uuidv4 } from "uuid";
import "./style.scss";
import StepComponent from "../../component/StepComponent/StepComponents";

const Ingredients = () => {
  const location = useLocation();
  const [storedData, setStoredData] = useState({
    totalAmount: 0,
    data: [],
  });
  const [userData, setUserData] = useState(null);
  const [dataUpdate, setDataUpdate] = useState([]);

  useEffect(() => {
    const savedData = localStorage.getItem("orderData");
    const userDataFromStorage = localStorage.getItem("userData");
    const savedDataUpdate = JSON.parse(localStorage.getItem("data")) || [];

    if (userDataFromStorage) {
      setUserData(JSON.parse(userDataFromStorage));
    }
    if (location.state) {
      const { totalAmount, data } = location.state;
      setStoredData({ totalAmount, data });
      localStorage.setItem("orderData", JSON.stringify({ totalAmount, data }));
    } else if (savedData) {
      setStoredData(JSON.parse(savedData));
    }

    setDataUpdate(savedDataUpdate);
  }, [location.state]);

  const columns = [
    {
      title: "User Name",
      dataIndex: "userName",
      width: "20%",
      render: () => (userData ? userData.name : "N/A"),
    },
    {
      title: "Ingredient Name",
      dataIndex: "name",
      width: "50%",
      render: (text, record) => (
        <div>{record.name.map((item) => `${item.name} (${item.amount})`).join(", ")}</div>
      ),
    },
    {
      title: "Status",
      dataIndex: "status",
      width: "16%",
      render: (text) => <span>pending</span>,
    },
    {
      title: "Total Amount",
      dataIndex: "totalAmount",
      render: (text, record) => <span>{record.totalAmount.toLocaleString()} VNĐ</span>,
    },
  ];

  const tableData = dataUpdate.map((item) => ({
    key: item.id || uuidv4(),
    name: item.data,
    totalAmount: item.totalAmount,
    userName: item.name,
  }));

  return (
    <div>
      <div style={{ marginLeft: 200, marginRight: 300 }}>
        <StepComponent />
      </div>
      <Table
        className="table-ingredients"
        pagination={{
          pageSize: 2,
          total: tableData.length,
        }}
        columns={columns}
        dataSource={tableData}
      />
    </div>
  );
};

export default Ingredients;
