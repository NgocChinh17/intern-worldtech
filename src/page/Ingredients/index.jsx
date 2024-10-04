import { Table } from "antd";
import React from "react";
import { useLocation } from "react-router-dom";
import "./style.scss";

const Ingredients = () => {
  const location = useLocation();
  const { totalAmount, data: dataIndex } = location.state || {};

  const columns = [
    {
      title: "Name",
      dataIndex: "name",
      width: "55%",
      render: (text, record) => (
        <div>
          {record.dataIndex && Array.isArray(record.dataIndex) ? (
            record.dataIndex.map((item) => (
              <span key={item.key}>
                {item.name} ({item.amount}){" "}
              </span>
            ))
          ) : (
            <span>{record.name}</span>
          )}
        </div>
      ),
    },
    {
      title: "Price",
      dataIndex: "price",
      width: "40%",
      render: (text) => <span>${text}</span>,
    },
  ];

  const data = [
    {
      price: totalAmount,
      dataIndex,
    },
  ];

  return (
    <div>
      <Table
        className="table-ingredients"
        pagination={5}
        columns={columns}
        dataSource={data}
      />
    </div>
  );
};

export default Ingredients;
