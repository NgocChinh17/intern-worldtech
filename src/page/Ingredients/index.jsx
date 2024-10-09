import React, { useEffect, useState } from "react";
import { Table } from "antd";
import { useLocation } from "react-router-dom";
import { v4 as uuidv4 } from "uuid";

import StepComponent from "../../component/StepComponent/StepComponents";
import AreaChartComponent from "../../component/AreaChartComponent/AreaChartComponent";
import SearchComponent from "../../component/SearchComponent/SearchComponent";

import { removeAccents } from "../../utils";

import "./style.scss";

const Ingredients = () => {
  const location = useLocation();
  const [storedData, setStoredData] = useState({
    totalAmount: 0,
    data: [],
  });

  const [userData, setUserData] = useState(null);
  const [dataUpdate, setDataUpdate] = useState([]);
  const [currentStep, setCurrentStep] = useState(2);
  const [searchText, setSearchText] = useState("");
  const [chartData, setChartData] = useState([]);

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
      setCurrentStep(3);
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
      width: "13%",
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
      title: "User Phone",
      dataIndex: "userPhone",
      width: "15%",
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
      title: "Ingredient Name",
      dataIndex: "name",
      width: "30%",
      render: (text, record) => (
        <div>{record.name.map((item) => `${item.name} (${item.amount})`).join(", ")}</div>
      ),
    },
    {
      title: "Status",
      dataIndex: "status",
      width: "10%",
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
    phone: item.phone,
    note: item.Note,
  }));

  // const filteredData = tableData.filter(
  //   (item) =>
  //     item.userName.toLowerCase().includes().removeAccents(searchText.toLowerCase()) ||
  //     item.phone.toLowerCase().includes(searchText.toLowerCase()) ||
  //     item.note.toLowerCase().includes(searchText.toLowerCase()) ||
  //     item.totalAmount
  //       .toLocaleString()
  //       .toLowerCase()
  //       .includes(searchText.toLowerCase()) ||
  //     item.name.some((ingredient) =>
  //       ingredient.name.toLowerCase().includes(searchText.toLowerCase())
  //     )
  // );

  useEffect(() => {
    const processedChartData = dataUpdate.map((item) => ({
      name: item.name,
      totalAmount: item.totalAmount,
    }));
    setChartData(processedChartData);
  }, [dataUpdate]);

  const filteredData = tableData.filter((item) => {
    const normalizedUserName = removeAccents(item.userName.toLowerCase());
    const normalizedPhone = removeAccents(item.phone.toLowerCase());
    const normalizedNote = removeAccents(item.note.toLowerCase());
    const normalizedTotalAmount = item.totalAmount.toLocaleString().toLowerCase();
    const normalizedIngredientNames = item.name.map((ingredient) =>
      removeAccents(ingredient.name.toLowerCase())
    );

    const normalizedSearchText = removeAccents(searchText.toLowerCase());

    return (
      normalizedUserName.includes(normalizedSearchText) ||
      normalizedPhone.includes(normalizedSearchText) ||
      normalizedNote.includes(normalizedSearchText) ||
      normalizedTotalAmount.includes(normalizedSearchText) ||
      normalizedIngredientNames.some((ingredient) =>
        ingredient.includes(normalizedSearchText)
      )
    );
  });

  return (
    <div>
      <div style={{ marginLeft: 200, marginRight: 300 }}>
        <StepComponent currentStep={currentStep} />
      </div>

      <div style={{ marginLeft: 200, marginRight: 300, marginBottom: 10, width: 300 }}>
        <SearchComponent onSearch={setSearchText} />{" "}
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

      <AreaChartComponent data={chartData} />
    </div>
  );
};

export default Ingredients;
