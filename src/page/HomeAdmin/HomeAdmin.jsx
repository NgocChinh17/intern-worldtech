import React, { useState } from "react";
import { Menu } from "antd";
import { BarChartOutlined } from "@ant-design/icons";

import { getItem } from "../../utils";

import AdminDashboard from "../../component/AdminDashboard/AdminDashboard";
import AreaChartComponent from "../../component/AreaChartComponent/AreaChartComponent";

const HomeAdmin = () => {
  const items = [
    getItem("Dashboard", "dashboard", <BarChartOutlined />),
    getItem("AreaCharts", "areaCharts", <BarChartOutlined />),
  ];

  const [keySelected, setKeySelected] = useState("");

  const handleOnClick = ({ key }) => {
    setKeySelected(key);
  };

  const renderPage = (key) => {
    switch (key) {
      case "dashboard":
        return <AdminDashboard />;
      case "areaCharts":
        return <AreaChartComponent />;
      default:
        return <AdminDashboard />;
    }
  };

  return (
    <div>
      <div style={{ display: "flex" }}>
        <Menu
          mode="inline"
          style={{ width: 170, height: "88vh", boxShadow: "1px 1px 2px #ccc" }}
          items={items}
          onClick={handleOnClick}
        />

        <div style={{ flex: 1, paddingLeft: 10 }}>{renderPage(keySelected)}</div>
      </div>
    </div>
  );
};

export default HomeAdmin;
