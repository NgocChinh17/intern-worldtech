import React from "react";
import { CartesianGrid, XAxis, YAxis, Tooltip, BarChart, Legend, Bar } from "recharts";

const AreaChartComponent = () => {
  const data = [
    {
      name: "User A",
      sp: 2400,
    },
    {
      name: "Page B",
      sp: 1398,
    },
    {
      name: "Page C",
      sp: 9800,
    },
    {
      name: "Page D",
      sp: 3908,
    },
    {
      name: "Page E",
      sp: 4800,
    },
    {
      name: "Page F",
      sp: 3800,
    },
    {
      name: "Page G",
      sp: 4300,
    },
  ];

  return (
    <div style={{ margin: "-50px 0px 0px 200px" }}>
      <h1>Biểu Đồ Doanh Thu</h1>
      <BarChart width={730} height={250} data={data}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Bar dataKey="sp" fill="#8884d8" />
      </BarChart>
    </div>
  );
};

export default AreaChartComponent;
